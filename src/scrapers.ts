import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer-core';
import { Path, Level, Project } from './types';

export async function scrapeProjects(levelHandle: ElementHandle<HTMLDivElement>): Promise<Project[]> {
    const mandatoryProjects: Project[] = await levelHandle.$$eval('ul.Bg-Layout > li', function (els: HTMLLIElement[]) {
        return els.map(function (el: HTMLLIElement, i: number) {
            return {
                order: i + 1,
                name: el.innerText.trim(),
                elective: false
            } as Project;
        });
    });

    const electiveProjects: Project[] = await levelHandle.$$eval('div.collapse ul li', function (els: HTMLLIElement[]) {
        return els.map(function (el: HTMLLIElement) {
            return {
                name: el.innerText.trim(),
                elective: true
            } as Project;
        });
    });

    return mandatoryProjects.concat(electiveProjects);
}

export async function scrapeLevels(page: Page, pathUrl: string): Promise<Level[]> {
    const levels: Level[] = [];

    await page.goto(pathUrl);
    await page.waitForSelector('#mainContent > div.container > div > div:nth-child(2) > div:nth-child(2) > div');
    const levelHandles: ElementHandle<HTMLDivElement>[] = await page.$$('#mainContent > div.container > div > div:nth-child(2) > div:nth-child(2) > div > div');

    for (const levelHandle of levelHandles) {
        const name = await levelHandle.$eval('h5', (el: HTMLHeadingElement) => el.innerText);

        const levelNumber: number = await levelHandle.$eval('img', function (el: HTMLImageElement) {
            const imageSrc = el.src;
            const imageAlt = el.alt;
            let matches = /level-(\d)/i.exec(imageSrc);
            if (matches && matches[1]) {
                return parseInt(matches[1]);
            }

            matches = /level(\d)/i.exec(imageAlt);
            if (matches && matches[1]) {
                return parseInt(matches[1]);
            }

            return 0;
        });

        let numberOfElectives = 0;

        const electiveHandle:  ElementHandle<HTMLParagraphElement> | null = await levelHandle.$('div.collapse p');
        if (electiveHandle) {
            numberOfElectives = await electiveHandle.evaluate(function (el: HTMLParagraphElement) {
                const matches = /(\d)/.exec(el.innerText);
                if (matches && matches[1]) {
                    return parseInt(matches[1]);
                }

                return 0;
            });
        }

        const projects = await scrapeProjects(levelHandle);

        const numberOfProjects = projects.filter(project => !project.elective).length + numberOfElectives;

        levels.push({
            name: name.trim(),
            levelNumber,
            numberOfProjects,
            projects
        } as Level);
    }

    return levels;
}

export async function scrapePaths(browser: Browser): Promise<Path[]> {
    const paths: Path[] = [];
    let page: Page | undefined = undefined;

    try {
        page = await browser.newPage();
        await page.goto('https://www.toastmasters.org/Education/Pathways/Pathways%20Paths%20and%20Projects');

        await page.waitForSelector('#mainContent > div.container.main-padding div.text-center');
        const pathLinkHandles: ElementHandle[] = await page.$$('#mainContent > div.container.main-padding div.text-center .pathtile');

        let pathPage: Page | undefined = undefined;

        for (const pathLinkHandle of pathLinkHandles) {
            try {
                pathPage = await browser.newPage();

                const name = await pathLinkHandle.$eval('a span', (el) => el.innerText);

                const url = await pathLinkHandle.$eval('a', (el) => el.href);
                const levels = await scrapeLevels(pathPage, url);

                paths.push({
                    name,
                    levels
                });
            } catch (err2) {
                console.error(`An error occurred scraping a path: ${err2}`);
            } finally {
                if (pathPage) {
                    await pathPage.close();
                }

                pathPage = undefined;
            }
        }
    } catch (err) {
        console.error(`An error occurred scraping paths: ${err}`);
    } finally {
        if (page) {
            await page.close();
        }
    }

    return paths;
}

export async function scrapeToastmasters(): Promise<void> {
    let browser: Browser | undefined = undefined;

    try {
        browser = await puppeteer.launch({
            product: 'chrome',
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });

        const paths = await scrapePaths(browser);
        console.log(paths);
    } catch (err) {
        console.error(`An error occurred scraping toastmasters: ${err}`);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

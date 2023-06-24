import { Path, Level, Project } from '../types/pathways.type';

const TOASTMASTERS_BASE_URL = 'https://www.toastmasters.org';
const PATHWAYS_URL = 'https://www.toastmasters.org/Education/Pathways/Pathways%20Paths%20and%20Projects';
const PATH_TILE_PATTERN = /<div class="well pathtile">\s*<a href="([^"]+)">.*?<span>([^<]+)<\/span>.*?<\/div>/gms;

interface ScrapedPathway {
    name: string;
    url: string;
}

async function getPathwaysAndUrlsToScrape(): Promise<ScrapedPathway[]> {

    const pathsToScrape: ScrapedPathway[] = [];

    const response = await fetch(PATHWAYS_URL);
    const htmlContent = await response.text();

    let matches: RegExpMatchArray | null;
    while ((matches = PATH_TILE_PATTERN.exec(htmlContent)) !== null) {
        if (!matches[1] || !matches[2]) {
            break;
        }

        pathsToScrape.push({ name: matches[2], url: `${TOASTMASTERS_BASE_URL}${matches[1]}` });
    }

    return pathsToScrape;
}

function extractProjects(projectLis: string, elective: boolean): Project[] {
    const projects: Project[] = [];

    const projectPattern = /<li>\s*(.*?)\s*<\/li>/gms;
    let matches: RegExpMatchArray | null;
    let i: number = 1;
    while ((matches = projectPattern.exec(projectLis)) !== null) {
        if (!matches[1]) {
            continue;
        }

        const name = matches[1].replace(/\s{2,}/, ' ');

        projects.push({
            order: elective ? undefined : i,
            name,
            elective
        } as Project);

        i++;
    }

    return projects;
}

async function scrapeSinglePath(name: string, url: string): Promise<Path> {
    const response = await fetch(url);
    const htmlContent = await response.text();

    const path: Path = {
        name: name,
        levels: []
    };

    const levelPattern = /<img[^>]*?level-(\d)[^>]+>.*?<h5[^>]+>([^>]+)<\/h5>.*?<ul[^>]+>\s*(.*?)\s*<\/ul>.*?\s*.*?(?:<button.*?<p[^>]+>\D+(\d).*?<ul[^>]+>\s*(.*?)\s*<\/ul>)?/gms;
    let matches: RegExpMatchArray | null;
    while ((matches = levelPattern.exec(htmlContent)) !== null) {
        if (!matches) {
            break;
        }

        if (!matches[1] || !matches[2] || !matches[3]) {
            continue;
        }

        const mandatoryProjects = extractProjects(matches[3], false);

        const level: Level = {
            name: matches[2],
            levelNumber: parseInt(matches[1]),
            numberOfProjects: mandatoryProjects.length,
            projects: [ ...mandatoryProjects ]
        };

        if (!matches[4] || !matches[5]) {
            path.levels.push(level);
            continue;
        }

        const electiveProjects = extractProjects(matches[5], true);
        level.numberOfProjects += parseInt(matches[4]);
        level.projects.push(...electiveProjects);

        path.levels.push(level);
    }

    return path;
}

export async function scrapePaths(): Promise<Path[]> {
    const paths: Path[] = [];

    const pathsToScrape = await getPathwaysAndUrlsToScrape();
    for (const { name, url } of pathsToScrape) {
        paths.push(await scrapeSinglePath(name, url));
    }

    return paths;
}


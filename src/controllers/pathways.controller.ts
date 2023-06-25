import { Request, Response } from 'express';
import { Path, Level, Project } from '../types/pathways.type';
import { IPath, PathModel, LevelModel, ProjectModel } from '../models/pathways.model';
import { scrapePaths } from '../scrapers/pathways.scraper';

function convertPathModelToPath(pathModel: IPath): Path {
    return {
        name: pathModel.name,
        levels: pathModel.levels.map(function (level): Level {
            return {
                name: level.name,
                levelNumber: level.levelNumber,
                numberOfProjects: level.numberOfProjects,
                projects: level.projects.map(function (project): Project {
                    return {
                        name: project.name,
                        elective: project.elective,
                        order: project.order
                    };
                })
            };
        })
    };
}

async function saveAllPaths(paths: Path[]) {
    await ProjectModel.deleteMany({});
    await LevelModel.deleteMany({});
    await PathModel.deleteMany({});

    for (const path of paths) {
        const pathDocument = await PathModel.create({
            name: path.name,
            levels: []
        });

        for (const level of path.levels) {
            const levelDocument = await LevelModel.create({
                name: level.name,
                levelNumber: level.levelNumber,
                numberOfProjects: level.numberOfProjects,
                projects: []
            });

            for (const project of level.projects) {
                const projectDocument = await ProjectModel.create({
                    name: project.name,
                    elective: project.elective,
                    order: project.order
                });

                levelDocument.projects.push(projectDocument);
            }

            await levelDocument.save();
            pathDocument.levels.push(levelDocument);
        }

        await pathDocument.save();
    }
}

export async function updatePaths(_: Request<{}, {}, {}>, res: Response<{ status: string; }>) {
    const paths = await scrapePaths();
    await saveAllPaths(paths);

    res.status(200).send({
        status: 'success'
    });
}

export async function findPathByName(req: Request<{ name: string; }>, res: Response<Path | { message: string; }>) {
    const name = req.params.name;

    const pathModel: IPath | null = await PathModel.findOne({
        name
    }).populate({
        path: 'levels',
        populate: {
            path: 'projects'
        }
    });

    if (!pathModel) {
        res.status(404).send({
            message: `The path '${name}' does not exist`
        });
        return;
    }

    res.status(200).send(convertPathModelToPath(pathModel));
}

export async function findAllPaths(_: Request<{}>, res: Response<Path[] | { message: string; }>) {
    try {
        if (process.env['MONGODB_URI']) {
            res.status(200).json({ message: 'hello world!' });
            return;
        }

        const pathModels: IPath[] = await PathModel.find({})
            .populate({
                path: 'levels',
                populate: {
                    path: 'projects'
                }
            });

        res.status(200)
            .send(pathModels.map(convertPathModelToPath));
    } catch (error) {
        res.status(500).json({
            message: `An error has occurred: ${error}`
        });
    }
}

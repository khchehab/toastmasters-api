/**
 * Interface that represents a project.
 */
export interface Project {
    name: string;
    elective: boolean;
    order?: number;
}

/**
 * An interface that represents a level.
 */
export interface Level {
    name: string;
    levelNumber: number;
    numberOfProjects: number;

    projects: Project[];
}

/**
 * An interface that represents a path.
 */
export interface Path {
    name: string;

    levels: Level[];
}

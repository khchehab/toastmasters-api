export interface Project {
    name: string;
    elective: boolean;
    order?: number;
}

export interface Level {
    name: string;
    levelNumber: number;
    numberOfProjects: number;

    projects: Project[];
}

export interface Path {
    name: string;

    levels: Level[];
}

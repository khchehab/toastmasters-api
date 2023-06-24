import { Schema, Document, model } from 'mongoose';
import { Path, Level, Project } from '../types/pathways.type';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    elective: {
        type: Boolean,
        required: true
    },
    order: Number
});

const LevelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    levelNumber: {
        type: Number,
        required: true
    },
    numberOfProjects: {
        type: Number,
        required: true
    },
    projects: {
        type: [ProjectSchema],
        required: true
    }
});

const PathSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    levels: {
        type: [LevelSchema],
        required: true
    },
});

export interface IProject extends Project, Document {}
export interface ILevel extends Level, Document {}
export interface IPath extends Path, Document {}

export const ProjectModel = model<IProject>('Project', ProjectSchema);
export const LevelModel = model<ILevel>('Level', LevelSchema);
export const PathModel = model<IPath>('Path', PathSchema);

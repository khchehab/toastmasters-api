import { Schema, Document, model } from 'mongoose';
import { Role } from '../types/role.type';

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: false
    }
});

export interface IRole extends Role, Document {}

export const RoleModel = model<IRole>('Role', RoleSchema);

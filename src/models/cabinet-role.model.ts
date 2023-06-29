import { Schema, Document, model } from 'mongoose';
import { CabinetRole } from '../types/cabinet-role.type';

const CabinetRoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: false
    }
});

export interface ICabinetRole extends CabinetRole, Document {}

export const CabinetRoleModel = model<ICabinetRole>('CabinetRole', CabinetRoleSchema);

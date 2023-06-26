import { Request, Response } from 'express';
import { CabinetRole } from '../types/cabinet-role.type';
import { ICabinetRole, CabinetRoleModel } from '../models/cabinet-role.model';
import { getCabinetRoles } from '../scrapers/cabinet-role.scraper';

function convertCabinetRoleModelToRole(cabinetRoleModel: ICabinetRole): CabinetRole {
    return {
        name: cabinetRoleModel.name,
        abbreviation: cabinetRoleModel.abbreviation
    };
}

export async function updateCabinetRoles(_: Request<{}, {}, {}>, res: Response<{ status: string; }>) {
    await CabinetRoleModel.deleteMany({});

    const cabinetRoles = getCabinetRoles();
    await CabinetRoleModel.insertMany(cabinetRoles);

    res.status(200).send({
        status: 'success'
    });
}

export async function findAllCabinetRoles(_: Request<{}>, res: Response<CabinetRole[]>) {
    const cabinetRoleModels: ICabinetRole[] = await CabinetRoleModel.find({});
    res.status(200).send(cabinetRoleModels.map(convertCabinetRoleModelToRole));
}

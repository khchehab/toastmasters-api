import { Request, Response } from 'express';
import { Role } from '../types/role.type';
import { IRole, RoleModel } from '../models/role.model';
import { getRoles } from '../scrapers/role.scraper';

function convertRoleModelToRole(roleModel: IRole): Role {
    return {
        name: roleModel.name,
        abbreviation: roleModel.abbreviation
    };
}

export async function updateRoles(_: Request<{}, {}, {}>, res: Response<{ status: string; }>) {
    await RoleModel.deleteMany({});

    const roles = getRoles();
    await RoleModel.insertMany(roles);

    res.status(200).send({
        status: 'success'
    });
}

export async function findAllRoles(_: Request<{}>, res: Response<Role[]>) {
    const roleModels: IRole[] = await RoleModel.find({});
    res.status(200).send(roleModels.map(convertRoleModelToRole));
}

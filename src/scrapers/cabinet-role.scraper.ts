import { CabinetRole } from '../types/cabinet-role.type';

export function getCabinetRoles(): CabinetRole[] {
    return [
        {
            "name": "President"
        } as CabinetRole,
        {
            "name": "Vice President of Education",
            "abbreviation": "VPE"
        },
        {
            "name": "Vice President of Membership",
            "abbreviation": "VPM"
        },
        {
            "name": "Vice President of Public Relations",
            "abbreviation": "VPPR"
        },
        {
            "name": "Secretary"
        } as CabinetRole,
        {
            "name": "Treasurer"
        } as CabinetRole,
        {
            "name": "Sergent at Arms",
            "abbreviation": "SAA"
        }
    ];
}

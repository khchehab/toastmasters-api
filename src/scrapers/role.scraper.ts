import { Role } from '../types/role.type';

export function getRoles(): Role[] {
    return [
        {
            name: "Toastmaster of the Evening",
            abbreviation: "TME"
        },
        {
            name: "Grammarian"
        } as Role,
        {
            name: "Ah Counter"
        } as Role,
        {
            name: "Timer"
        } as Role,
        {
            name: "Speaker"
        } as Role,
        {
            name: "Evaluator"
        } as Role,
        {
            name: "General Evaluator",
            abbreviation: "GE"
        },
        {
            name: "Table Topics Master",
            abbreviation: "TTM"
        }
    ];
}

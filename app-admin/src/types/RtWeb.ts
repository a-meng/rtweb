
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Role {
    id: number;
    pid: number | null;
    name: string;
}
export interface Perm {
    id: number;
    pid: number | null;
    name: string;
    value: string;
    attr: string;
    desc: string;
}

export interface UserRole extends User {
    roles: Role[];
}
export interface RolePerm extends Role {
    perms: Perm[];
}
export interface UserRolePerm extends User {
    roles: RolePerm[];
}

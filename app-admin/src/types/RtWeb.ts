
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
export interface Permission {
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
export interface RolePermission extends Role {
    perms: Permission[];
}
export interface UserRolePermission extends User {
    roles: RolePermission[];
}

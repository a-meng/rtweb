export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Role {
    id: number;
    pid: number;
    name: string;
}
export interface Permission {
    id: number;
    pid: number;
    name: string;
    value: string;
    attr: string;
    desc: string;
}

import { query } from '../db/mysql'
import pick from 'lodash/pick'

export function findAll(): Promise<User[]> {
    return query({
        sql: `SELECT * FROM rtweb.user`
    });
}
export function findById(id: number | string): Promise<User[]> {
    return query({
        sql: 'select * from rtweb.user where id=? ',
        values: [id]
    });
}
export function findByEmail(email: string): Promise<User[]> {
    return query({
        sql: 'select * from rtweb.user where email=? ',
        values: [email]
    });
}
export function create(user: UserDoc): Promise<any> {
    let obj = pick(user, ['name', 'email', 'pwd']);
    let fields = Object.keys(obj).join(',');
    return query({
        sql: `insert into rtweb.user (${fields}) values(${Object.keys(obj).map(e => '?').join(',')})`,
        values: Object.values(obj)
    });
}

export function updateById(id: number | string, user: UserDoc): Promise<any> {
    let obj = pick(user, ['name', 'email', 'pwd']);
    let str = Object.keys(obj).map(e => `${e}=?`).join(',');
    return query({
        sql: `update  rtweb.user set ${str} where id=?`,
        values: [...Object.values(obj), id]
    });
}

export function deleteById(id: number | string): Promise<any> {
    return query({
        sql: 'delete from rtweb.user where id=?',
        values: [id]
    });
}

export interface User {
    id: number;
    name: string;
    email: string;
    pwd: string;
}
export interface UserDoc {
    name: string;
    email: string;
    pwd: string;
}
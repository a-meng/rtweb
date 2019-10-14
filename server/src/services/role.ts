import { query } from '../db/mysql'
import pick from 'lodash/pick'
export function findAll(): Promise<Role[]> {
    return query({
        sql: 'select * from rtweb.role '
    });
}
export async function findById(id: number | string): Promise<Role[]> {
    return await query({
        sql: 'select * from rtweb.role where id=? ',
        values: [id]
    });
}
export function findByUserId(uid: number | string): Promise<Role[]> {
    return query({
        sql: `SELECT r.id,r.name
                FROM
                    rtweb.role r,
                    rtweb.user_role ur
                WHERE 
                    ur.user_id=? and r.id=ur.role_id`,
        values: [uid]
    });
}
export function create(role: Role): Promise<any> {
    let obj = pick(role, ['pid', 'name']);
    let fields = Object.keys(obj).join(',');
    return query({
        sql: `insert into rtweb.role (${fields}) values(${Object.keys(obj).map(e => '?').join(',')})`,
        values: Object.values(obj)
    });
}

export function updateById(id: number | string, role: Role): Promise<any> {
    let obj = pick(role, ['pid', 'name']);
    let str = Object.keys(obj).map(e => `${e}=?`).join(',');
    return query({
        sql: `update  rtweb.role set ${str} where id=?`,
        values: [...Object.values(obj), id]
    });
}

export function deleteById(id: number | string): Promise<any> {
    return query({
        sql: 'delete from rtweb.role where id=?',
        values: [id]
    });
}

export class Role {
    id: number;
    pid: number;
    name: string;
}

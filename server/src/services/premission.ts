import { query } from '../db/mysql'
import pick from 'lodash/pick'

export function findAll(): Promise<Permission[]> {
    return query({
        sql: 'select * from rtweb.permission '
    });
}
export function findById(id: number): Promise<Permission[]> {
    return query({
        sql: 'select * from rtweb.permission where id=? ',
        values: [id]
    });
}
export function findByRoleId(rid: number): Promise<Permission[]> {
    return query({
        sql: `  SELECT 
                    p.*
                FROM
                    (SELECT * FROM rtweb.role_permission WHERE role_id=?)  rp
                LEFT JOIN
                    rtweb.permission p 
                ON 
                    rp.permission_id = p.id`,
        values: [rid]
    });
}
export function findByRoleIds(roleIds: number[]): Promise<(Permission & { role_id: number })[]> {
    return query({
        sql: `  SELECT 
                    p.*,
                    rp.role_id
                FROM
                    (SELECT * FROM rtweb.role_permission WHERE role_id in (?) )  rp
                LEFT JOIN
                    rtweb.permission p 
                ON 
                    rp.permission_id = p.id`,
        values: [roleIds]
    });
}

export function create(perm: Permission): Promise<any> {
    let obj = pick(perm, ['pid', 'name', 'value', 'attr', 'desc']);
    let fields = Object.keys(obj).map(e => `\`${e}\``).join(',');
    return query({
        sql: `insert into rtweb.permission (${fields}) values(${Object.keys(obj).map(e => '?').join(',')})`,
        values: Object.values(obj)
    });
}

export function updateById(id: number, perm: Permission): Promise<any> {
    let obj = pick(perm, ['pid', 'name', 'value', 'attr', 'desc']);
    let str = Object.keys(obj).map(e => `\`${e}\`=?`).join(',');
    return query({
        sql: `update  rtweb.permission set ${str} where id=?`,
        values: [...Object.values(obj), id]
    });
}

export function deleteById(id: number): Promise<any> {
    return query({
        sql: 'delete from rtweb.permission where id=?',
        values: [id]
    });
}

export class Permission {
    id: number;
    pid: number;
    name: string;
    value: string;
    attr: string;
    desc: string;
}

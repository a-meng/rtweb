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

export async function create(perm: Permission): Promise<boolean> {
    let obj = pick(perm, ['pid', 'name', 'value', 'attr', 'desc']);
    let fields = Object.keys(obj).map(e => `\`${e}\``).join(',');
    await query({
        sql: `insert into rtweb.permission (${fields}) values(${Object.keys(obj).map(e => '?').join(',')})`,
        values: Object.values(obj)
    });
    return true;
}

export async function updateById(id: number, perm: Permission): Promise<boolean> {
    let obj = pick(perm, ['pid', 'name', 'value', 'attr', 'desc']);
    let str = Object.keys(obj).map(e => `\`${e}\`=?`).join(',');
    await query({
        sql: `update  rtweb.permission set ${str} where id=?`,
        values: [...Object.values(obj), id]
    });
    return true;
}

export async function deleteById(id: number): Promise<boolean> {
    const premList = await findAll();
    if (premList.map(e => e.pid).includes(id)) {
        throw ('不能删除带子节点的权限项');
    }
    // 删掉与角色关联项
    await query({
        sql: 'delete from rtweb.role_permission where permission_id=?',
        values: [id]
    });
    // 删掉权限项
    await query({
        sql: 'delete from rtweb.permission where id=?',
        values: [id]
    });
    return true;
}

export interface Permission {
    id: number;
    pid: number;
    name: string;
    value: string;
    attr: string;
    desc: string;
}

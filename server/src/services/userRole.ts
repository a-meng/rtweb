import { query } from '../db/mysql'

export function deleteByUserId(id: number): Promise<any> {
    return query({
        sql: `DELETE FROM rtweb.user_role  WHERE user_id = ?`,
        values: [id]
    });
}
export function deleteByRoleId(id: number): Promise<any> {
    return query({
        sql: `DELETE FROM rtweb.user_role  WHERE role_id = ?`,
        values: [id]
    });
}
export async function updateByUserId(id: number, roleIds: number[]): Promise<any> {
    const res1 = await deleteByUserId(id);
    const res2 = await query({
        sql: `insert into rtweb.user_role (user_id,role_id) values ` + roleIds.map(e => `(?,?)`).join(','),
        values: roleIds.reduce((a, b) => a.concat([id, b]), [])
    });
    return [res1, res2];
}
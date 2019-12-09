import { query } from '../db/mysql'

export function deleteByRoleId(id: number): Promise<any> {
    return query({
        sql: `DELETE FROM rtweb.role_permission  WHERE role_id = ?`,
        values: [id]
    });
}
export function deleteByPermId(id: number): Promise<any> {
    return query({
        sql: `DELETE FROM rtweb.role_permission  WHERE permission_id = ?`,
        values: [id]
    });
}
export async function updateByRoleId(id: number, permIds: number[]): Promise<any> {
    const res1 = await deleteByRoleId(id);
    const res2 = await query({
        sql: `insert into rtweb.role_permission (role_id,permission_id) values ` + permIds.map(e => `(?,?)`).join(','),
        values: permIds.reduce((a, b) => a.concat([id, b]), [] as number[])
    });
    return [res1, res2];
}
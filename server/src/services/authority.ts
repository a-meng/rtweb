import { Permission, findByRoleIds } from "./premission";
import { findByUserId } from './role'
import { uniq } from 'lodash'


export function fetchAuthPathsByPerms(parms: Permission[]): string[] {
    return pathList(parms);
}

export async function fetchAuthPathsByRoleIds(roleIds: number[]): Promise<string[]> {
    let res = await findByRoleIds(roleIds);
    return uniq(([] as string[]).concat(
        ...roleIds.map(e =>
            pathList(
                res.filter(ee => ee.role_id === e)
            )
        )
    ));
}


export async function authByUserId(userId: number, path: string[]): Promise<boolean> {
    if (!userId) return false;
    let roles = await findByUserId(userId);
    let roleIds = roles.map(e => e.id);
    if (roleIds.includes(1)) {
        return true;
    }
    let fullPaths = await fetchAuthPathsByRoleIds(roleIds);
    return path.every(p => fullPaths.includes(p));
}


function pathList<T extends { id: number; pid: number; value: string; }>(t: T[]): string[] {
    // 找根节点
    const ids = t.map(e => e.id);
    const pids = uniq(t.map(e => e.pid)).filter(e => !ids.includes(e));
    // 记录数据
    const arr: string[] = [];
    // 遍历
    pids.forEach(pid => getPath(pid));
    return arr;
    function getPath(pid: number, prefix = ''): void {
        t.filter(e => e.pid === pid).forEach(has => {
            const path = prefix + '/' + has.value;
            arr.push(path);
            getPath(has.id, path);
        });
    }
}
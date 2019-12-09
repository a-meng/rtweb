import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, last, tap } from 'rxjs/operators';
import { uniq } from 'lodash';
import { UserRolePerm } from 'src/types/RtWeb';
@Injectable({ providedIn: 'root' })
export class SessService {
    sessSubject = new BehaviorSubject<UserRolePerm | null>(null);  // 用户信息
    sessInit = false;                    // 标记是否已经初始化过用户信息（防止未登录用户反复预加载）
    pathList: string[] = [];
    constructor() {
        this.sessSubject.subscribe(sess => {
            if (sess) {
                this.pathList = uniq<string>(([] as string[]).concat(
                    ...sess.roles.map(e => pathList(e.perms))
                ));
            } else {
                this.pathList = [];
            }
        });
    }
    // 校验函数
    access(pathArr: string[]): boolean {
        const sess = this.sessSubject.value;
        if (!sess) {
            return false;
        } else {
            const arr = uniq<string>(([] as string[]).concat(
                ...sess.roles.map(e => pathList(e.perms))
            ));
            const result = pathArr.every(p => arr.includes(p));
            console.info('鉴权函数access ', { pathArr, result });
            return result;
        }
    }
}

interface Node { id: number; pid: number | null; value: string; }
function pathList<T extends Node>(t: T[]): string[] {
    // 找根节点
    const ids: (number | null)[] = t.map(e => e.id);
    const pids = uniq(t.map(e => e.pid)).filter(e => !ids.includes(e));
    // 记录数据
    const arr: string[] = [];
    // 遍历
    pids.forEach(pid => getPath(pid));
    return arr;
    function getPath(pid: number | null, prefix = ''): void {
        t.filter(e => e.pid === pid).forEach(has => {
            const path = prefix + '/' + has.value;
            arr.push(path);
            getPath(has.id, path);
        });
    }
}

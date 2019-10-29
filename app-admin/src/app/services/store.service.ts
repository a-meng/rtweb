import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sess, SessService } from './sess.service';
import { map, take, last, tap } from 'rxjs/operators';
import { uniq } from 'lodash';
@Injectable({ providedIn: 'root' })
export class StoreService {
    sessSubject: BehaviorSubject<Sess>;  // 用户信息
    sessInit = false;                    // 标记是否已经初始化过用户信息（防止未登录用户反复预加载）
    constructor(
        private sessServ: SessService
    ) {
        this.sessSubject = new BehaviorSubject<Sess>(null);
        // 一旦用户信息有更就标记已初始化过
        this.sessSubject.pipe(take(2), last()).subscribe(sess => this.sessInit = true);
    }
    // 校验函数
    access(path: string[]): Observable<boolean> {
        return this.sessSubject.pipe(
            map(sess => {
                if (sess) {
                    return uniq<string>([].concat(
                        ...sess.roles.map(e => pathList(e.perms))
                    ));
                } else {
                    return [];
                }
            }),
            map(arr => {
                const result = path.every(p => arr.includes(p));
                console.info('鉴权函数access ', { path, arr, result });
                return result;
            })
        );
    }
    fetchSess(): Observable<Sess> {
        return this.sessServ.fetch().pipe(
            map(res => res.data.sess),
            tap(sess => this.sessSubject.next(sess)),
            take(1),
        );
    }
}

interface Node { id: number; pid: number; value: string; }
function pathList<T extends Node>(t: T[]): string[] {
    // 找根节点
    const ids = t.map(e => e.id);
    const pids = uniq(t.map(e => e.pid)).filter(e => !ids.includes(e));
    // 记录数据
    const arr = [];
    // 遍历
    pids.forEach(pid => getPath(pid, ''));
    return arr;
    function getPath(pid: number, prefix: string): void {
        t.filter(e => e.pid === pid).forEach(has => {
            const path = prefix + '/' + has.value;
            arr.push(path);
            getPath(has.id, path);
        });
    }
}

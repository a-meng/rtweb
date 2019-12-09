import { Injectable } from '@angular/core';
import {
    CanLoad, Route, UrlSegment,
    ActivatedRouteSnapshot, RouterStateSnapshot,
    UrlTree, Router, CanActivate, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessService } from '../services/sess.service';
import { SessService as SessGraph } from 'src/app/graphql/query/Sess';
import { first, tap, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as NProgress from 'nprogress';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(
        private storeServ: SessService,
        private sessGraph: SessGraph,
        private router: Router
    ) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!route.data) {
            return true;
        }
        const path = route.data.auth as string[];
        console.info('执行canLoad', path);

        if (this.storeServ.sessInit) {
            return this.checkAccess(path);
        } else {
            return this.perLoadSess().pipe(
                map(() => this.checkAccess(path)),
            );
        }
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const path = route.data.auth as string[];
        console.info('执行canActivate', path);
        return this.checkAccess(path);
    }
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const path = childRoute.data.auth as string[];
        console.info('执行canActivateChild', path);
        return this.checkAccess(path);
    }

    // 校验登录，如果不通过全部跳转登录页
    checkAccess(path: string[]) {
        const state = this.storeServ.access(path);
        if (!state) {
            this.router.navigateByUrl('/login');
        }
        return state;
    }

    // 自动加载用户信息
    perLoadSess() {
        return this.sessGraph.fetch().pipe(
            tap(res => {
                this.storeServ.sessInit = true;
                this.storeServ.sessSubject.next(res.data.sess);
            })
        );
    }
}

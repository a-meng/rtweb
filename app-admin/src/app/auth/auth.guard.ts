import { Injectable } from '@angular/core';
import {
    CanLoad, Route, UrlSegment,
    ActivatedRouteSnapshot, RouterStateSnapshot,
    UrlTree, Router, CanActivate, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { SessService } from '../services/sess.service';
import { first, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as NProgress from 'nprogress';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

    constructor(
        private storeServ: StoreService,
        private sessServ: SessService,
        private router: Router
    ) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        const path = route.data.auth as string[];
        console.info('执行canLoad', path);
        // 属于还没有加载过用户信息
        return of(this.storeServ.sessInit).pipe(
            tap(() => NProgress.start()),
            switchMap(init => !init ? this.storeServ.fetchSess() : of(true)),
            switchMap(() => this.storeServ.access(path)),
            tap(res => {
                NProgress.done();
                if (!res) {
                    this.router.navigateByUrl('/login');
                }
            }),
            first()
        );
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const path = route.data.auth as string[];
        console.info('执行canActivate', path);
        return this.storeServ.access(path);
    }
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const path = childRoute.data.auth as string[];
        console.info('执行canActivateChild', path);
        return this.storeServ.access(path);
    }
}

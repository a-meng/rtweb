import { Injectable } from '@angular/core';
import {
    CanLoad, Route, UrlSegment,
    ActivatedRouteSnapshot, RouterStateSnapshot,
    UrlTree, Router, CanActivate, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { SessService } from '../services/sess.service';
import { first, tap, switchMap, map } from 'rxjs/operators';
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
        if (!route.data) {
            this.router.navigateByUrl('/login');
            return false;
        }
        const path = route.data.auth as string[];
        console.info('执行canLoad', path);
        // 属于还没有加载过用户信息

        if (this.storeServ.sessInit) {
            const state = this.storeServ.access(path);
            if (!state) {
                this.router.navigateByUrl('/login');
            }
            return state;
        } else {
            return this.storeServ.fetchSess().pipe(
                map(res => this.storeServ.access(path)),
                tap(res => {
                    if (!res) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
        }
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

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { map, tap, first } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private storeServ: StoreService,
        private router: Router
    ) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.info('next.url', next.url);
        console.info('state.url', state.url);

        return this.storeServ.sessSubject
            .pipe(
                first(),
                map(res => {
                    console.info('auth.guard->canActivate', res);
                    // 未登录
                    if (!res) {
                        this.router.navigateByUrl('/login');
                        return false;
                    } else {
                        // 登录鉴权
                        return true;
                    }
                })
            );

    }

}

import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { SessService } from '../services/sess.service';
import { first, tap, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
    constructor(
        private storeServ: StoreService,
        private sessServ: SessService,
        private router: Router
    ) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        console.info('can-load.guard->canLoad');
        return this.sessServ.fetch()
            .pipe(
                first(),
                map(res => {
                    const sess = res.data.sess;
                    if (!sess) {
                        this.router.navigateByUrl('/login');
                        return false;
                    } else {
                        this.storeServ.sessSubject.next(sess);
                        return true;
                    }
                })

            );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sess, LogoutService } from 'src/app/services/sess.service';
import { Subscription, combineLatest } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, OnDestroy {

    sess: Sess | null = null;
    headerNavList: HeaderNavItem[] = [];
    asideNavList: AsideNavItem[] = [];


    private subscription = new Subscription();
    constructor(
        private storeServ: StoreService,
        private logoutServ: LogoutService,
        private router: Router
    ) {

        this.headerNavList = [
            { accessPath: ['/rt'], label: '实时', href: '/rt' },
            { accessPath: ['/report'], label: '报表', href: '/report' }
        ].map(e => {
            return {
                ...e,
                visible: storeServ.access(e.accessPath)
            };
        });
        this.asideNavList = [
            { accessPath: ['/admin/user'], label: '用户管理', path: '/users' },
            { accessPath: ['/admin/role'], label: '角色管理', path: '/roles' },
            { accessPath: ['/admin/permission'], label: '权限管理', path: '/permissions' },
        ].map(e => {
            return {
                ...e,
                visible: storeServ.access(e.accessPath)
            };
        });
        this.subscription.add(this.storeServ.sessSubject.subscribe(sess => this.sess = sess));
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onLogout() {
        this.logoutServ.mutate().subscribe({
            error: (err) => {
                console.info('登录出错', err);
            },
            next: (res) => {
                console.info('接口错误', res);
                if (res.data) {
                    this.storeServ.sessSubject.next(null);
                    this.router.navigate(['/login']);
                }
            }
        });
    }

}

interface AsideNavItem {
    label: string;
    path: string;
}
interface HeaderNavItem {
    label: string;
    href: string;
    visible: boolean;
    accessPath: string[];
}

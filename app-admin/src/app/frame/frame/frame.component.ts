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

    sess: Sess = null;
    headerNavList: HeaderNavItem[] = [];
    asideNavList: AsideNavItem[] = [];


    private subscription = new Subscription();
    constructor(
        private storeServ: StoreService,
        private logoutServ: LogoutService,
        private router: Router
    ) {

        const ob1 = this.storeServ.sessSubject.subscribe(res => this.sess = res)


        const headerList = [
            { accessPath: ['/rt'], label: '实时', href: '/rt' },
            { accessPath: ['/report'], label: '报表', href: '/report' }
        ];
        const asideList = [
            { accessPath: ['/admin/user'], label: '用户管理', path: '/users' },
            { accessPath: ['/admin/role'], label: '角色管理', path: '/roles' },
            { accessPath: ['/admin/permission'], label: '权限管理', path: '/permissions' },
        ];

        const ob2 = combineLatest(headerList.map(e => {
            return this.storeServ.access(e.accessPath).pipe(
                map(res => ({ ...e, visible: res }))
            );
        })).subscribe(res => this.headerNavList = res.filter(e => e.visible));
        const ob3 = combineLatest(asideList.map(e => {
            return this.storeServ.access(e.accessPath).pipe(
                map(res => ({ ...e, visible: res }))
            );
        })).subscribe(res => this.asideNavList = res.filter(e => e.visible));

        [ob1, ob2, ob3].forEach(ob => this.subscription.add(ob));
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onLogout() {
        this.logoutServ.mutate().subscribe(res => {
            this.storeServ.sessSubject.next(null);
            this.router.navigate(['/login']);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogoutService } from 'src/app/graphql/mutation/logout';
import { SessService } from 'src/app/services/sess.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

    sess = this.sessServ.sessSubject.value;
    headerNavList: HeaderNavItem[] = [];
    asideNavList: AsideNavItem[] = [];

    constructor(
        private sessServ: SessService,
        private logoutServ: LogoutService,
        private msgServ: MessageService,
        private router: Router
    ) {

        this.headerNavList = [
            { label: '实时', href: '/rt' },
            { label: '报表', href: '/report' }
        ].filter(e => this.sessServ.access([e.href]));

        this.asideNavList = [
            { label: '用户管理', path: '/users', accessKey: '/admin/user' },
            { label: '角色管理', path: '/roles', accessKey: '/admin/role' },
            { label: '权限管理', path: '/permissions', accessKey: '/admin/permission' },
        ].filter(e => this.sessServ.access([`${e.accessKey}`]));
    }

    onLogout() {
        this.logoutServ.mutate().subscribe({
            error: err => {
                this.msgServ.add({
                    type: 'error',
                    content: err
                });
            },
            next: (res) => {
                if (res.data) {
                    this.sessServ.sessSubject.next(null);
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
}

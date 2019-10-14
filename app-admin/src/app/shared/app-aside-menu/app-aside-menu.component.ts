import { Component, OnInit, Input } from '@angular/core';
import { Sess } from 'src/app/services/sess.service';

@Component({
    selector: 'app-app-aside-menu',
    templateUrl: './app-aside-menu.component.html',
    styleUrls: ['./app-aside-menu.component.scss']
})
export class AppAsideMenuComponent implements OnInit {
    @Input() sess: Sess = null;

    public menus = [
        { label: '用户管理', path: 'users', value: 'admin/user' },
        { label: '角色管理', path: 'roles', value: 'admin/role' },
        { label: '权限管理', path: 'permissions', value: 'admin/permissions' }
    ];

    constructor(

    ) { }

    ngOnInit() {

    }

}

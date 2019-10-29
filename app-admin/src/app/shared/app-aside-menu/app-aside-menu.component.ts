import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-app-aside-menu',
    templateUrl: './app-aside-menu.component.html',
    styleUrls: ['./app-aside-menu.component.scss']
})
export class AppAsideMenuComponent implements OnInit {

    public menus = [
        { label: '用户管理', path: '/users', value: 'admin/user' },
        { label: '角色管理', path: '/roles', value: 'admin/role' },
        { label: '权限管理', path: '/permissions', value: 'admin/permission' }
    ];

    constructor(

    ) { }

    ngOnInit() {

    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, IUser, DeleteUserService } from '../../../../services/users.service';
import { StoreService } from 'src/app/services/store.service';
import { switchMap, first } from 'rxjs/operators';
import { RolesService } from 'src/app/services/roles.service';
import findCids from 'src/app/shared/util/findCids';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    userList: IUser[] = []; // 用户列表
    canEdit = false;        // 可编辑权限
    childrenRoleId: number[] = [];  // 子角色id列表
    constructor(
        private usersServ: UsersService,
        private rolesServ: RolesService,
        private deleteUserServ: DeleteUserService,
        private storeServ: StoreService,
    ) {
        // 获取角色列表
        this.rolesServ.fetch().subscribe(res => {
            const roles = res.data.rtWebRoles;
            this.storeServ.sessSubject.pipe(first()).subscribe(sess => {
                const pids = sess.roles.map(e => e.id);
                this.childrenRoleId = findCids(roles, pids).filter(id => !pids.includes(id));
            });

        });
        this.refreshUserList();

        this.storeServ.access(['/admin/user/edit']).pipe(
            first()
        ).subscribe(res => this.canEdit = res);
    }

    ngOnInit() {
    }
    isChildrenRole(user: IUser): boolean {
        return user.roles.every(r => this.childrenRoleId.includes(r.id));
    }
    onDeleteById(id: number) {
        this.deleteUserServ.mutate({ id }).subscribe(res => this.refreshUserList());
    }
    refreshUserList() {
        this.usersServ.fetch().subscribe(res => this.userList = res.data.rtWebUsers);
    }
    ngOnDestroy() {

    }

}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessService } from 'src/app/services/sess.service';
import { switchMap, first } from 'rxjs/operators';
import findCids from 'src/app/shared/util/findCids';
import { UsersService } from 'src/app/graphql/query/users';
import { RolesService } from 'src/app/graphql/query/roles';
import { DeleteUserService } from 'src/app/graphql/mutation/deleteUser';
import { UserRole } from 'src/types/RtWeb';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    sess = this.sessServ.sessSubject.value;  // 当前用户
    userList: UserRole[] = []; // 用户列表
    canEdit = false;        // 可编辑权限
    childrenRoleId: (number | null)[] = [];  // 子角色id列表
    constructor(
        private usersServ: UsersService,
        private rolesServ: RolesService,
        private deleteUserServ: DeleteUserService,
        private sessServ: SessService,
    ) {
        // 获取角色列表
        this.rolesServ.fetch().subscribe({
            next: res => {
                const roles = res.data.rtWebRoles;
                let pids: (number | null)[] = [];
                if (this.sess) {
                    pids = this.sess.roles.map(e => e.id);
                }
                this.childrenRoleId = findCids(roles, pids).filter(id => {
                    if (id === null) {
                        return false;
                    }
                    return !pids.includes(id);
                });

            }
        });
        this.refreshUserList();
        this.canEdit = this.sessServ.access(['/admin/user/edit']);
    }

    ngOnInit() {
    }
    isChildrenRole(user: UserRole): boolean {
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


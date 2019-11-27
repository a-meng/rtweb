import { Component, OnInit, OnDestroy, ViewContainerRef, ElementRef } from '@angular/core';
import { Role } from '../../../../../types/RtWeb';
import { RolesService } from '../../../../services/roles.service';
import { StoreService } from '../../../../services/store.service';
import { Subscription, combineLatest } from 'rxjs';
import findCids from '../../../../shared/util/findCids';
import { ActivatedRoute } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { UsersService, UpdateUserRolesService, IUser } from 'src/app/services/users.service';
import { Sess } from 'src/app/services/sess.service';
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {
    userId = parseInt(this.route.snapshot.params.id, 10);
    fullRoleList: Role[] = [];
    // 父角色状态
    sess: Sess = null;

    selectedRoleIds: number[] = [];    // 已选角色列表
    sub: Subscription = new Subscription();

    constructor(
        private el: ElementRef,
        private rolesServ: RolesService,
        private storeServ: StoreService,
        private usersServ: UsersService,
        private updateUserRolesServ: UpdateUserRolesService,
        private route: ActivatedRoute
    ) {
        // 获取可选角色列表
        combineLatest([
            this.storeServ.sessSubject,
            this.rolesServ.fetch()
        ]).pipe(
            take(1),
            tap(([sess, res]) => {
                this.fullRoleList = res.data.rtWebRoles;
                this.sess = sess;
            })
        ).subscribe();


        // 获取默认选中
        this.usersServ.fetch({ id: this.userId }).pipe(
            take(1),
            map(res => res.data.rtWebUsers[0])
        ).subscribe(user => {
            if (user) {
                this.selectedRoleIds = user.roles.map(e => e.id);
            }
        });


    }

    onSave() {
        this.updateUserRolesServ.mutate({
            id: this.userId,
            roleIds: this.selectedRoleIds
        }).subscribe(res => {
            console.info(res.data);
        });
    }


    ngOnInit() {
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getChildrenRoles(parentRoleId: number): Role[] {
        const arr = this.fullRoleList;
        const cids = findCids(arr, [parentRoleId]);
        return arr.filter(e => cids.includes(e.id) && e.id !== parentRoleId);
    }
    onCheckboxChange(roleId: number, checked: boolean) {
        const { selectedRoleIds } = this;
        if (checked) {
            if (!selectedRoleIds.includes(roleId)) {
                selectedRoleIds.push(roleId);
            }

        } else {
            this.selectedRoleIds = selectedRoleIds.filter(id => id !== roleId);
        }
    }
}

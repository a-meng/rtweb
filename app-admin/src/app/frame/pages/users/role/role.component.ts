import { Component, OnInit, OnDestroy, ViewContainerRef, ElementRef } from '@angular/core';
import { Role } from '../../../../../types/RtWeb';
import { RolesService } from '../../../../services/roles.service';
import { StoreService } from '../../../../services/store.service';
import { Subscription, combineLatest } from 'rxjs';
import findCids from '../../../../shared/util/findCids';
import { ActivatedRoute } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { UsersService, UpdateUserRolesService } from 'src/app/services/users.service';
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {

    roleList: Role[] = [];      // 可选角色列表
    defaultSelected: number[] = [];    // 已选角色列表
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
                const roles = res.data.rtWebRoles;
                const roleIds = sess.roles.map(e => e.id);
                console.info('所有角色列表', roles);
                if (roleIds.includes(1)) {
                    this.roleList = roles;
                } else {
                    const ids = findCids(roles, roleIds);
                    console.info('findCids', ids);
                    this.roleList = roles.filter(e => ids.includes(e.id)).map(e => {
                        return {
                            id: e.id,
                            pid: e.pid,
                            name: e.name
                        }
                    });
                }
            })
        ).subscribe();

        // 获取默认选中
        const userId = parseInt(this.route.snapshot.params.id, 10);
        this.usersServ.fetch({ id: userId }).pipe(
            take(1),
            map(res => res.data.rtWebUsers[0])
        ).subscribe(user => {
            if (user) {
                this.defaultSelected = user.roles.map(e => e.id);
            }
        });

    }

    onSave() {
        const root = this.el.nativeElement as HTMLElement;
        const checkedNodes = Array.from(root.querySelectorAll<HTMLInputElement>('input:checked'));
        const roleIds = checkedNodes.map(e => parseInt(e.value, 10));
        const userId = parseInt(this.route.snapshot.params.id, 10);
        console.info(roleIds);
        this.updateUserRolesServ.mutate({
            id: userId, roleIds
        }).subscribe(res => {
            console.info(res.data);
        });

    }


    ngOnInit() {
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

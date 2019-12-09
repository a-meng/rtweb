import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PermsService} from 'src/app/graphql/query/perms';
import {RolePermsService} from 'src/app/graphql/query/rolePerms'
import { Subscription } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Perm } from 'src/types/RtWeb';
import { UpdateRolePermsService } from 'src/app/graphql/mutation/upateRolePerms';

@Component({
    selector: 'app-perms',
    templateUrl: './perms.component.html',
    styleUrls: ['./perms.component.scss']
})
export class PermsComponent implements OnInit, OnDestroy {
    roleId = parseInt(this.route.snapshot.params.id, 10);
    permList: Perm[] = [];
    selected: number[] = [];
    subscription: Subscription = new Subscription();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private permsServ: PermsService,
        private rolePermsServ: RolePermsService,
        private updateRolePermsServ: UpdateRolePermsService
    ) {
        const id = this.roleId; // 当前要编辑的角色
        // 可选权限列表
        this.subscription.add(
            // 获取角色详情
            this.rolePermsServ.fetch({ id })
                .pipe(
                    map(res => res.data.rtWebRoles[0]),
                    tap(role => {
                        this.selected = role.perms.map(e => e.id);
                    }),
                    switchMap(role => this.rolePermsServ.fetch({ id: role.pid })),
                    map(res => res.data.rtWebRoles[0]),
                    tap(role => {
                        this.permList = role.perms;
                    })
                )
                .subscribe()
        );


    }

    ngOnInit() {
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    onSave() {
        this.updateRolePermsServ.mutate({
            id: this.roleId,
            permIds: this.selected
        }).subscribe(res => {
            // if (res.data?.updateRolePerms) {

            // }
        });
    }
    onChange(permId: number, checked: boolean) {
        if (checked) {
            this.addOnePerm(permId);
        } else {
            this.removeOnePerm(permId);
        }
    }
    addOnePerm(id: number) {
        // 找出所有父级id
        const selected = this.selected;
        const ids = findParentsId(this.permList, [id]);
        ids.forEach(e => {
            if (!selected.includes(e)) {
                selected.push(e);
            }
        });
    }
    removeOnePerm(id: number) {
        // 找出所有子集
        const selected = this.selected;
        const ids = findChildrenId(this.permList, [id]);
        this.selected = selected.filter(e => !ids.includes(e));
    }
}

function findParentsId(list: Perm[], ids: number[]): number[] {
    const has = list.find(e => e.id === ids[0]);
    if (has && has.pid) {
        return findParentsId(list, [has.pid, ...ids]);
    } else {
        return ids;
    }
}
function findChildrenId(list: Perm[], ids: number[]): number[] {
    let children: number[] = [];
    ids.forEach(e => {
        const arr = list.filter(ee => ee.pid === e).map(ee => ee.id);
        children = children.concat(arr);
    });
    if (children.length > 0) {
        return [...ids, ...findChildrenId(list, children)];
    } else {
        return ids;
    }
}

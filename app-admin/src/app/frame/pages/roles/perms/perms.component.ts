import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPerm, PermsService } from '../../../../services/permissions.service';
import { IRole, RolesService } from '../../../../services/roles.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-perms',
    templateUrl: './perms.component.html',
    styleUrls: ['./perms.component.scss']
})
export class PermsComponent implements OnInit {
    roleId = parseInt(this.route.snapshot.params.id, 10);
    permList: IPerm[] = [];
    selected: number[] = [];
    subscription: Subscription = new Subscription();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private permsServ: PermsService,
        private rolesServ: RolesService
    ) {
        const id = this.roleId;

        // id=1为系统管理员
        if (id === 1) {
            this.subscription.add(
                this.permsServ.fetch()
                    .subscribe(res => this.permList = res.data.rtWebPerms)
            );
        } else {
            this.subscription.add(
                this.permsServ.fetch({ id: this.roleId })
                    .subscribe(res => this.permList = res.data.rtWebPerms)
            );
        }
    }

    ngOnInit() {
    }
    onSave() {

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

function findParentsId(list: IPerm[], ids: number[]): number[] {
    const has = list.find(e => e.id === ids[0]);
    if (has && has.pid) {
        return findParentsId(list, [has.pid, ...ids]);
    } else {
        return ids;
    }
}
function findChildrenId(list: IPerm[], ids: number[]): number[] {
    let children = [];
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

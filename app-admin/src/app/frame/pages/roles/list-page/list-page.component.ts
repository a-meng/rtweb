import { Component, OnInit, OnDestroy } from '@angular/core';
import { RolesService } from 'src/app/graphql/query/roles';
import { DeleteRoleService } from 'src/app/graphql/mutation/deleteRole';
import { SessService } from 'src/app/services/sess.service';
import { Subscription } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Role, UserRolePerm } from 'src/types/RtWeb'
import findCids from 'src/app/shared/util/findCids';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    selectedRoleId: number | null = null;
    fullRoleList: Role[] = [];
    roleList: Role[] = [];
    canEdit = false;
    sess: UserRolePerm | null = null;
    constructor(
        private rolesServ: RolesService,
        private deleteRoleServ: DeleteRoleService,
        private storeServ: SessService
    ) {
        this.canEdit = this.storeServ.access(['/admin/role/edit']);
        this.storeServ.sessSubject.pipe(
            first()
        ).subscribe(sess => {
            this.sess = sess;
            if (sess) {
                this.selectedRoleId = sess.roles[0].id;
            }

            this.updateFullRoleList();
        });
    }

    ngOnInit() {
    }
    onDeleteById(id: number) {
        this.deleteRoleServ.mutate({ id }).subscribe(() => this.updateFullRoleList());
    }
    updateFullRoleList() {
        this.rolesServ.fetch().subscribe(res => {
            this.fullRoleList = res.data.rtWebRoles;
            this.updateRoleList();
        });
    }
    updateRoleList() {
        const { selectedRoleId, fullRoleList } = this;
        const cids = findCids(fullRoleList, [selectedRoleId]);
        this.roleList = fullRoleList.filter(e => cids.includes(e.id));
    }
    onSelectRole(value: string) {
        this.selectedRoleId = parseInt(value, 10);
        this.updateRoleList();
    }
}

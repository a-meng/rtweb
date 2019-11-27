import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRole, RolesService, DeleteRoleService } from '../../../../services/roles.service';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Sess } from 'src/app/services/sess.service';
import findCids from 'src/app/shared/util/findCids';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    selectedRoleId: number = null;
    fullRoleList: IRole[] = [];
    roleList: IRole[] = [];
    canEdit = false;
    sess: Sess = null;
    constructor(
        private rolesServ: RolesService,
        private deleteRoleServ: DeleteRoleService,
        private storeServ: StoreService
    ) {
        this.storeServ.access(['/admin/role/edit']).pipe(
            first()
        ).subscribe(res => this.canEdit = res);
        this.storeServ.sessSubject.pipe(
            first()
        ).subscribe(sess => {
            this.sess = sess;
            this.selectedRoleId = sess.roles[0].id;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRole, RolesService, DeleteRoleService } from '../../../../services/roles.service';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    roleList: IRole[] = [];
    canEdit = false;
    constructor(
        private rolesServ: RolesService,
        private deleteRoleServ: DeleteRoleService,
        private storeServ: StoreService
    ) {
        this.updateRoleList();
        this.storeServ.access(['/admin/role/edit']).pipe(
            first()
        ).subscribe(res => this.canEdit = res);
    }

    ngOnInit() {
    }
    onDeleteById(id: number) {
        this.deleteRoleServ.mutate({ id }).subscribe(() => this.updateRoleList());
    }
    updateRoleList() {
        this.rolesServ.fetch().subscribe(res => this.roleList = res.data.rtWebRoles);
    }
}

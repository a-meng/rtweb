import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRole, RolesService, DeleteRoleService } from '../../../services/roles.service';
import { Sess, SessService } from '../../../services/sess.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    roleList: IRole[] = [];
    hasEditPerm = true;
    sub: Subscription = new Subscription();
    constructor(
        private rolesServ: RolesService,
        private sessServ: SessService,
        private deleteRoleServ: DeleteRoleService
    ) {
        this.rolesServ.fetch().subscribe(res => this.roleList = res.data.rtWebRoles);
    }

    ngOnInit() {
    }
    onDeleteById(id: number) {
        this.deleteRoleServ.mutate({ id })
            .pipe(
                switchMap(() => this.rolesServ.watch().refetch())
            )
            .subscribe(res => this.roleList = res.data.rtWebRoles);
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

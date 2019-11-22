import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermsService, DeletePermService } from '../../../../services//permissions.service';
import { switchMap, first } from 'rxjs/operators';
import { Permission } from 'src/types/RtWeb';
import { StoreService } from 'src/app/services/store.service';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    permList: Permission[] = [];
    canEdit = false;
    constructor(
        private permsServ: PermsService,
        private deletePermServ: DeletePermService,
        private storeServ: StoreService
    ) {

        this.updatePermList();
        this.storeServ.access(['/admin/permission/edit']).pipe(
            first()
        ).subscribe(res => this.canEdit = res);

    }

    public onDeleteById(id: number) {
        this.deletePermServ.mutate({ id }).pipe(
            switchMap(() => this.permsServ.watch().refetch())
        ).subscribe(res => this.permList = res.data.rtWebPerms);
    }
    ngOnInit() {
    }
    updatePermList() {
        this.permsServ.fetch().subscribe(res => this.permList = res.data.rtWebPerms)
    }
}

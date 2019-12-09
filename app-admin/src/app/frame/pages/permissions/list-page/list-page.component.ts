import { Component, OnInit, } from '@angular/core';
import { PermsService, DeletePermService } from 'src/app/services//permissions.service';
import { first } from 'rxjs/operators';
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
        this.canEdit = this.storeServ.access(['/admin/permission/edit']);
    }

    public onDeleteById(perm: Permission) {
        if (window.confirm(`确定要删除 (${perm.id}:${perm.name}) 吗？`)) {
            this.deletePermServ.mutate({ id: perm.id }).subscribe(res => {
                this.updatePermList();
            });
        }
    }
    ngOnInit() {
    }
    updatePermList() {
        this.permsServ.fetch().subscribe(res => {
            this.permList = res.data.rtWebPerms;
        });
    }
}

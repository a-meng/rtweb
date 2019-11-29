import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermsService, DeletePermService } from '../../../../services//permissions.service';
import { switchMap, first } from 'rxjs/operators';
import { Permission } from 'src/types/RtWeb';
import { StoreService } from 'src/app/services/store.service';
import findCids from 'src/app/shared/util/findCids';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    permList: Permission[] = [];
    filteredPermList: Permission[] = [];
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
            this.onFilterPermList(null);
        });
    }
    onFilterPermList(str: string) {
        const { permList } = this;
        const id = parseInt(str, 10) || null;
        const ids = findCids(permList, [id]);
        this.filteredPermList = permList.filter(e => ids.includes(e.id));
    }
}

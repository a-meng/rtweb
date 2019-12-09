import { Component, OnInit, } from '@angular/core';
import { DeletePermService } from 'src/app/graphql/mutation/deletePerm';
import { PermsService } from 'src/app/graphql/query/perms';
import { first } from 'rxjs/operators';
import { Perm } from 'src/types/RtWeb';
import { SessService } from 'src/app/services/sess.service';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
    permList: Perm[] = [];
    canEdit = false;
    constructor(
        private permsServ: PermsService,
        private deletePermServ: DeletePermService,
        private storeServ: SessService
    ) {
        this.updatePermList();
        this.canEdit = this.storeServ.access(['/admin/permission/edit']);
    }

    public onDeleteById(perm: Perm) {
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

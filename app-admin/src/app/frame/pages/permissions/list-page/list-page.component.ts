import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPerm, PermsService, DeletePermService } from '../../../../services//permissions.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    permList: IPerm[] = [];
    hasEditPerm = true;
    subscription: Subscription = new Subscription();
    constructor(
        private permsServ: PermsService,
        private deletePermServ: DeletePermService
    ) {
        this.subscription.add(
            this.permsServ.fetch().subscribe(res => this.permList = res.data.rtWebPerms)
        );
    }

    public onDeleteById(id: number) {
        this.deletePermServ.mutate({ id }).pipe(
            switchMap(() => this.permsServ.watch().refetch())
        ).subscribe(res => this.permList = res.data.rtWebPerms);
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

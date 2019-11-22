import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, IUser, DeleteUserService } from '../../../../services/users.service';
import { StoreService } from 'src/app/services/store.service';
import { switchMap, first } from 'rxjs/operators';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    userList: IUser[] = [];
    canEdit = false;
    constructor(
        private usersServ: UsersService,
        private deleteUserServ: DeleteUserService,
        private storeServ: StoreService
    ) {
        this.updateUserList();
        this.storeServ.access(['/admin/user/edit']).pipe(
            first()
        ).subscribe(res => this.canEdit = res);
    }

    ngOnInit() {
    }
    onDeleteById(id: number) {
        this.deleteUserServ.mutate({ id }).subscribe(res => this.updateUserList());
    }
    updateUserList() {
        this.usersServ.fetch().subscribe(res => this.userList = res.data.rtWebUsers);
    }
    ngOnDestroy() {

    }

}


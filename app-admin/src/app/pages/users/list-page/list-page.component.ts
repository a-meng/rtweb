import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, IUser, DeleteUserService } from '../../../services/users.service';
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
    userList: IUser[] = [];
    constructor(
        private usersServ: UsersService,
        private deleteUserServ: DeleteUserService
    ) {
        this.usersServ.fetch().subscribe(res => this.userList = res.data.rtWebUsers);
    }

    ngOnInit() {
    }
    onDeleteById(id: number) {
        this.deleteUserServ.mutate({ id })
            .pipe(
                switchMap(res => {
                    console.info('完成删除')
                    return this.usersServ.watch().refetch().then(res => {
                        console.info('刷新rtWebUsers');
                        return res;
                    });
                })
            )
            .subscribe(res => {
                console.info('更新到页面');
                this.userList = res.data.rtWebUsers;
            });
    }
    ngOnDestroy() {

    }

}


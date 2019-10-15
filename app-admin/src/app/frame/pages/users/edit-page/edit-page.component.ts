import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService, CreateUserService, UpdateUserService, IUserDocInput } from '../../../../services/users.service';
import { pick } from 'lodash';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
    form = {
        id: null,
        name: '',
        email: '',
        pwd: ''
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usersServ: UsersService,
        private createUserServ: CreateUserService,
        private updateUserServ: UpdateUserService
    ) {
        const id = this.route.snapshot.params.id;
        if (id) {
            this.form.id = id;
            this.usersServ.fetch({
                id: parseInt(id, 10)
            }).subscribe(res => {
                const { name, email } = res.data.rtWebUsers[0];
                this.form.name = name;
                this.form.email = email;
            });
        }
    }

    ngOnInit() {
    }

    onSubmit(event: Event) {
        event.preventDefault();
        const form = this.form;
        const doc: IUserDocInput = pick(this.form, ['name', 'email', 'pwd']);
        if (!form.id) {
            this.createUserServ.mutate({ doc })
                .subscribe(() => {
                    this.usersServ.watch().refetch().then(() => this.toListPage());
                });

        } else {
            this.updateUserServ.mutate({ id: parseInt(form.id, 10), doc })
                .subscribe(() => {
                    this.usersServ.watch().refetch().then(() => this.toListPage());
                });
        }
    }
    private toListPage() {
        this.router.navigate(['users']);
    }
}


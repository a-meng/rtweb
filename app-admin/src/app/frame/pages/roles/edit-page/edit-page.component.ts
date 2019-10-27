import { Component, OnInit } from '@angular/core';
import { IRole, RolesService, CreateRoleService, UpdateRoleService } from '../../../../services/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
    form: IRole = {
        id: null,
        pid: null,
        name: ''
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private rolesServ: RolesService,
        private createRoleServ: CreateRoleService,
        private updateRoleServ: UpdateRoleService
    ) {
        let id = this.route.snapshot.params.id;
        let pid = this.route.snapshot.queryParams.pid;
        if (id) { id = parseInt(id, 10); }
        if (pid) {
            pid = parseInt(pid, 10);
            this.form.pid = pid;
        }
        if (id) {
            this.rolesServ.fetch({ id }).subscribe(res => {
                const role = res.data.rtWebRoles[0];
                if (role) {
                    this.form.id = parseInt(id, 10);
                    this.form.pid = role.pid;
                    this.form.name = role.name;
                }
            });
        }

    }

    ngOnInit() {
    }
    onSubmit() {
        const { id, pid, name } = this.form;
        if (!id) {
            this.createRoleServ.mutate({ doc: { pid, name } })
                .pipe(
                    switchMap(() => this.rolesServ.watch().refetch())
                )
                .subscribe(() => this.toListPage());
        } else {
            this.updateRoleServ.mutate({ id, doc: { pid, name } })
                .pipe(
                    switchMap(() => this.rolesServ.watch().refetch())
                )
                .subscribe(() => this.toListPage());
        }

    }
    private toListPage() {
        this.router.navigate(['roles']);
    }
}
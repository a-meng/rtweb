import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/graphql/query/roles';
import { CreateRoleService } from 'src/app/graphql/mutation/createRole';
import { UpdateRoleService } from 'src/app/graphql/mutation/updateRole';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/types/RtWeb'
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
    form: Role = {
        id: 0,
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
            this.createRoleServ.mutate({ doc: { pid, name } }).subscribe(() => this.toListPage());
        } else {
            this.updateRoleServ.mutate({ id, doc: { pid, name } }).subscribe(() => this.toListPage());
        }

    }
    private toListPage() {
        this.router.navigate(['roles']);
    }
}

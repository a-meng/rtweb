import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPermDocInput, PermsService, CreatePermService, UpdatePermService } from '../../../../services/permissions.service';
import { switchMap } from 'rxjs/operators';
import { pick } from 'lodash';
import { Subscription } from 'rxjs';
import { Permission } from 'src/types/RtWeb';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
    form: Permission = {
        id: null,
        pid: null,
        name: '',
        value: '',
        attr: '',
        desc: ''
    };
    subscription: Subscription = new Subscription();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private permsServ: PermsService,
        private createPermServ: CreatePermService,
        private updatePermServ: UpdatePermService
    ) {
        let id = this.route.snapshot.params.id;
        let pid = this.route.snapshot.queryParams.pid;
        if (id) { id = parseInt(id, 10); }
        if (pid) {
            pid = parseInt(pid, 10);
            this.form.pid = pid;
        }

        if (id) {
            this.subscription.add(
                this.permsServ.fetch({ id }).subscribe(res => {
                    const perm = res.data.rtWebPerms[0];
                    if (perm) {
                        this.form = perm;
                    }
                })
            );
        }
    }

    ngOnInit() {
    }
    onSubmit() {
        const form = this.form;
        const doc = pick(form, ['pid', 'name', 'value', 'attr', 'desc']);
        if (!form.id) {
            this.createPermServ.mutate({ doc }).subscribe(() => this.router.navigate(['permissions']));

        } else {
            this.updatePermServ.mutate({ id: form.id, doc }).subscribe(() => this.router.navigate(['permissions']));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

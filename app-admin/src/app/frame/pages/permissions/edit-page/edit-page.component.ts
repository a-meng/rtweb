import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPermDocInput, CreatePermService } from 'src/app/graphql/mutation/createPerm';
import { UpdatePermService } from 'src/app/graphql/mutation/updatePerm';
import { PermsService } from 'src/app/graphql/query/perms';
import { switchMap } from 'rxjs/operators';
import { pick } from 'lodash';
import { Subscription } from 'rxjs';
import { Perm } from 'src/types/RtWeb';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
    form: Perm = {
=======
    form: Permission = {
>>>>>>> 65af5d5afe05711977040297d51fe86530225bb6
        id: 0,
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
        private updatePermServ: UpdatePermService,
        private msgServ: MessageService,
    ) {
        let id = this.route.snapshot.params.id;
        let pid = this.route.snapshot.queryParams.pid;
        if (id) { id = parseInt(id, 10); }
        if (pid) {
            pid = parseInt(pid, 10);
            this.form.pid = pid;
        }

        if (id) {
            this.permsServ.fetch({ id }).subscribe({
                next: res => {
                    console.info(res);
                    if (res.data.rtWebPerms) {
                        const perm = res.data.rtWebPerms[0];
                        if (perm) {
                            this.form = perm;
                        }
                    } else if (res.errors) {
                        this.msgServ.add({
                            type: 'error',
                            content: res.errors[0].message
                        });
                    }
                },
                error: err => {
                    this.msgServ.add({
                        type: 'error',
                        content: err
                    });
                },
            });
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

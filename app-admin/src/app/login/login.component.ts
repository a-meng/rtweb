import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { SessService } from '../services/sess.service';
import * as NGprogress from 'nprogress';
import { LoginService } from '../graphql/mutation/login';
import { MessageService } from 'src/app/services/message.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form = {
        email: '',
        pwd: ''
    };
    constructor(
        private loginServ: LoginService,
        private stroeServ: SessService,
        private msgServ: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    onSubmit() {
        NGprogress.start();
        this.loginServ.mutate(this.form)
            .subscribe({
                next: res => {
                    if (res.data && res.data.login) {
                        this.stroeServ.sessSubject.next(res.data.login);
                        const targeUrl = this.route.snapshot.queryParamMap.get('target');
                        console.info('targeUrl', targeUrl);
                        this.router.navigate([targeUrl || '']);
                    } else {
                        let err = '未知错误';
                        if (res.errors && res.errors[0]) {
                            err = res.errors[0].message;
                        }
                        this.throwError(err);
                    }
                    NGprogress.done();
                },
                error: err => {
                    this.throwError(err);
                    NGprogress.done();
                }
            });
    }
    throwError(err: string) {
        this.msgServ.add({
            type: 'error',
            content: err
        });
    }
}

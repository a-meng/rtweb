import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/sess.service';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import * as NGprogress from 'nprogress';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form = {
        email: '',
        pwd: ''
    };
    constructor(
        private loginServ: LoginService,
        private stroeServ: StoreService,
        private router: Router
    ) { }

    ngOnInit() {
    }
    onSubmit() {
        NGprogress.start();
        this.loginServ.mutate(this.form).subscribe(res => {
            if (res.data && res.data.login) {
                this.stroeServ.sessSubject.next(res.data.login);
                this.router.navigate(['']);
            } else {
                if (res.errors && res.errors[0]) {
                    alert(res.errors[0].message);
                } else {
                    alert('未知错误');
                }

            }
            NGprogress.done();
        });
    }
}

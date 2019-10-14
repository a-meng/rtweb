import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/sess.service';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service'
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
        this.loginServ.mutate(
            this.form
        ).subscribe(res => {
            if (res.data.login) {
                this.stroeServ.sessSubject.next(res.data.login);
                this.router.navigate(['']);
            }
        });
    }

}

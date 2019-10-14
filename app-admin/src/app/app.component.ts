import { Component } from '@angular/core';
import { StoreService } from './services/store.service'
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading = true;
    constructor(
        public storeServ: StoreService,
        private router: Router
    ) {
        this.storeServ.sessSubject.subscribe(res => {
            this.loading = false;
        });
    }
}




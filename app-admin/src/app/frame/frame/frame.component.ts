import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sess } from 'src/app/services/sess.service';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, OnDestroy {

    sess: Sess = null;

    private subscription = new Subscription();
    constructor(
        private storeServ: StoreService
    ) {
        this.subscription.add(
            this.storeServ.sessSubject.subscribe(res => this.sess = res)
        );
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onLogout() {

    }

}

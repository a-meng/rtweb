import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import { SessService, Sess } from './sess.service';
@Injectable({ providedIn: 'root' })
export class StoreService {
    sessSubject = new ReplaySubject<Sess>(1);
    constructor(
        private sessServ: SessService
    ) {
        this.sessServ.fetch().subscribe(res => {
            console.info('sessServ.fetch', res.data.sess);
            this.sessSubject.next(res.data.sess);
        });
    }
}

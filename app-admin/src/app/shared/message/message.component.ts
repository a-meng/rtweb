import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from 'src/app/services/message.service';
import { tap, switchMap } from 'rxjs/operators';
import { timer, interval } from 'rxjs';
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
    messages: Message[] = [];
    constructor(
        msgServ: MessageService
    ) {
        msgServ.messageSubject.pipe(
            tap(res => this.messages.push(res)),
            // switchMap(() => interval(4000)),
            // tap(() => {
            //     this.messages.pop();
            // }),
        ).subscribe();
    }

    ngOnInit() {
    }

}

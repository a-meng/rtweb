import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messageSubject = new Subject<Message>();
    constructor() {
        console.info('MessageService.constructor');
     }
    add(msg: Message) {
        console.info('MessageService.add', msg);
        this.messageSubject.next(msg);
    }

}

export interface Message {
    type: 'error' | 'warning' | 'info' | 'success';
    content: string;
}

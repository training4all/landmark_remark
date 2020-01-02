import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggingMessageService {
    private messageSubject = new Subject<any>();

    constructor() {}

    getAlert(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    success(message: string) {
        this.messageSubject.next({ type: 'success', text: message });
    }

    error(message: string) {
        this.messageSubject.next({ type: 'error', text: message });
    }

    clear() {
        this.messageSubject.next();
    }
}

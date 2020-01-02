import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoggingMessageService } from '../services/logging-message.service';

@Component({
    selector: 'app-logging-message',
    templateUrl: './logging-message.component.html'
})
export class LoggingMessageComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(
        private loggingMessageService: LoggingMessageService
    ) { }

    ngOnInit() {
        this.subscription = this.loggingMessageService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }
                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

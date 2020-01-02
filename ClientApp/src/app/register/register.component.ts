import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import {LoggingMessageService} from '../services/logging-message.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
    registrationForm: FormGroup;
    loading = false;
    submitted = false;
    userSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private loggingMessageService: LoggingMessageService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // to easily access form fields
    get f() { return this.registrationForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset messages on submit
        this.loggingMessageService.clear();

        // stop here if form is invalid
        if (this.registrationForm.invalid) {
            return;
        }

        this.loading = true;
        this.userSubscription = this.userService.register(this.registrationForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loggingMessageService.success('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loggingMessageService.error(error);
                    this.loading = false;
                });
    }

    ngOnDestroy() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}

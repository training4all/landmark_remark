import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first} from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import {LoggingMessageService} from '../services/logging-message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    authSubscription: Subscription;
    loginForm: FormGroup;
    returnUrl: string;
    loading = false;
    submitted = false;

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private loggingMessageService: LoggingMessageService
    ) {
        // navigate to home page if already logged-in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.navigateToReturnUrl();
    }

    private navigateToReturnUrl() {
        // get return url from route parameters or default to home
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // to easily access form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset messages on submit
        this.loggingMessageService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authSubscription = this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loggingMessageService.error(error);
                    this.loading = false;
                });
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
}

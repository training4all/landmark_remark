import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnDestroy{
    authSubscription: Subscription;
    isExpanded = false;
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authSubscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}

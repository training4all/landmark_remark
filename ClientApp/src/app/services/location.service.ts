import { Location } from './../models/location';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private currentLocationSubject = new Subject<Location>();

    constructor() {
    }

    getCurrentLocation() {
        return this.currentLocationSubject.asObservable();
    }

    setCurrentLocation(location: Location) {
        this.currentLocationSubject.next(location);
    }
}

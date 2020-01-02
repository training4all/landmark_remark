import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiSettings } from './../common/api.settings';
import { Marker } from './../models/marker';
import { Location } from './../models/location';
import { LocationService } from '../services/location.service';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { SearchType } from '../common/constants';

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    createNoteWindow: google.maps.InfoWindow;
    displayNoteWindow: google.maps.InfoWindow;
    location: Location;
    currentMarkerId: number;
    private allMarkerSubject = new BehaviorSubject<Marker[]>([]);

    constructor(
        private http: HttpClient,
        private locationService: LocationService,
        private authenticationService: AuthenticationService
    ) {
        this.locationService.getCurrentLocation().subscribe(
            loc => this.location = loc
        );
    }

    loadMarkers() {
        return this.http.get<Marker[]>(ApiSettings.API_ALL_MARKERS_ENDPOINT)
            .pipe(
                map(markers => {
                    this.allMarkerSubject.next(markers);
                })
            );
    }

    public get allMarkersValue(): Marker[] {
        return this.allMarkerSubject.value;
    }

    showNotesWindow(event: any, googleMap: google.maps.Map, marker: google.maps.Marker, isMarkerExists: boolean) {
        const displayedMarker = _.find(this.allMarkersValue, ['id', marker['id']]);
        if (isMarkerExists) {
            this._displayNote(googleMap, marker, displayedMarker);
        } else {
            this._createNote(googleMap, marker);
        }
    }

    _displayNote(googleMap, marker, displayedMarker) {
        const contentString = `<div id="displayNoteDiv" class="container">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="title">
                                                Created By : <strong>${displayedMarker.userName}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="content">${displayedMarker.description}</div>
                                        </div>
                                    </div>
                                </div>`;

        if (this.displayNoteWindow == null) {
            this.displayNoteWindow = new google.maps.InfoWindow({
                maxWidth: 800
            });
        }

        this.displayNoteWindow.setContent(contentString);
        this.displayNoteWindow.open(googleMap, marker);
    }

    saveNote(data) {
        const position = this.createNoteWindow.getPosition();
        const marker: Marker = {
            description: data.description,
            userName: this.authenticationService.currentUserValue.userName,
            latitude: position.lat(),
            longitude: position.lng()
        };

        return this.http.post(ApiSettings.API_POST_MARKER_ENDPOINT, marker);
    }

    closeNote() {
        this.createNoteWindow.close();
    }

    getMarkers() {
        return this.allMarkerSubject.asObservable();
    }

    setMarkers(markers: Marker[]) {
        this.allMarkerSubject.next(markers);
    }

    filterMarkers = (markers: google.maps.Marker[], $event: any) => {
        const filteredMarkers = ($event.data.seachType === SearchType.NOTES_TEXT) ?
            this._filterByNotesDescription($event.data.searchText) : this._filterByUserName($event.data.searchText);

        _.each(markers, (marker) => {
            if (_.some(filteredMarkers, ['id', marker['id']])) {
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        });
    }

    clearSearch = (markers: google.maps.Marker[]) => {
        _.each(markers, (marker) => {
            marker.setVisible(true);
        });
    }

    _createNote(googleMap, marker) {
        if (this.createNoteWindow == null) {
            this.createNoteWindow = new google.maps.InfoWindow({
                content: document.getElementById('newNoteDiv'),
                maxWidth: 800
            });
        }
        this.createNoteWindow.open(googleMap, marker);
    }

    _filterByNotesDescription = (searchText: string) => {
        return _.filter(this.allMarkersValue, (marker: Marker) => {
            return _.includes(marker.description.toLowerCase(), searchText.toLowerCase());
        });
    }

    _filterByUserName = (searchText: string) => {
        return _.filter(this.allMarkersValue, (marker: Marker) => {
            return _.includes(marker.userName.toLowerCase(), searchText.toLowerCase());
        });
    }
}

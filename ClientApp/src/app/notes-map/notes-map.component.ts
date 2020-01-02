import { MarkerService } from './../services/marker.service';
import { Marker } from './../models/marker';
import { Location } from './../models/location';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { LocationService } from '../services/location.service';
import { Constants } from '../common/constants';
import * as _ from 'lodash';

@Component({
    selector: 'app-notes-map',
    templateUrl: './notes-map.component.html',
    styleUrls: ['./notes-map.component.css']
})
export class NotesMapComponent implements AfterViewInit {

    constructor(
        private locationService: LocationService,
        private markerService: MarkerService
    ) {
        this.markerService.loadMarkers().subscribe(() => console.log('markers loaded'));
    }

    @ViewChild('mapContainer', { static: true }) gmap: ElementRef;
    map: google.maps.Map;
    cords: google.maps.LatLng;
    currentLocationMarker: google.maps.Marker;
    googleMarkers: google.maps.Marker[] = [];

    ngAfterViewInit() {
        this._setMap();
    }

    _setMap() {
        // if its enabled in html5 browsers
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.cords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    this._renderMap();
                },
                () => {
                    this.cords = new google.maps.LatLng(Constants.DEFAULT_LATTITUDE, Constants.DEFAULT_LONGITUDE);
                    this._renderMap();
                }
            );
        } else {
            // Browser doesn't support Geolocation
            this.cords = new google.maps.LatLng(Constants.DEFAULT_LATTITUDE, Constants.DEFAULT_LONGITUDE);
            this._renderMap();
        }
    }

    _renderMap() {
        const mapOptions: google.maps.MapOptions = {
            center: this.cords,
            zoom: 8,
        };
        this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

        this._renderMarkers();
        this._renderCurrentLocation();
        this._addSearchControl();
    }

    _renderCurrentLocation() {
        this.currentLocationMarker = new google.maps.Marker({
            position: this.cords,
            map: this.map,
            title: 'current location',
            draggable: true,
            zIndex: 10000
        });

        this._addMarkerClickEvent(this.currentLocationMarker, false);

        this.currentLocationMarker.addListener('dragend', (event) => {
            this.locationService.setCurrentLocation({
                lattitude: event.latLng.lat(),
                longitude: event.latLng.lng()
            } as Location);
        });
    }

    _renderMarkers() {
        this.markerService.getMarkers().subscribe(
            (markers: Marker[]) => {
                this._removeAllMarkersFromMap();

                _.each(markers, (mkr) => {
                    const marker = new google.maps.Marker({
                        position: new google.maps.LatLng(mkr.latitude, mkr.longitude),
                        draggable: false,
                        title: mkr.userName,
                        map: this.map,
                        icon: {
                            path: 'M22-48h-44v43h16l6 5 6-5h16z',
                            fillColor: '#e6e600',
                            fillOpacity: 1,
                            strokeColor: '',
                            strokeWeight: 0
                        }
                    });
                    marker['id'] = mkr.id;
                    this.googleMarkers.push(marker);

                    this._addMarkerClickEvent(marker, true);
                });
            }
        );
    }

    _removeAllMarkersFromMap = () => {
        _.each(this.googleMarkers, (mkr) => {
            mkr.setMap(null);
        });
        this.googleMarkers = [];
    }

    filterMarkers = ($event) => {
        this.markerService.filterMarkers(this.googleMarkers, $event);
    }

    clearSearch = () => {
        this.markerService.clearSearch(this.googleMarkers);
    }

    _addMarkerClickEvent = (marker: google.maps.Marker, isMarkerExists: boolean) => {
        marker.addListener('click', (event) => {
            this.markerService.showNotesWindow(event, this.map, marker, isMarkerExists);
        });
    }

    _addSearchControl() {
        const serachControl = document.getElementById('searchControlDiv');
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(serachControl);
    }

    public onDiscardClicked() {
        this.markerService.closeNote();
    }
}

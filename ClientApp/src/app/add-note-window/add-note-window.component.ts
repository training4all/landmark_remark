import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MarkerService } from './../services/marker.service';
import { AuthenticationService } from './../services/authentication.service';

@Component({
    selector: 'app-add-note-window',
    templateUrl: './add-note-window.component.html'
})
export class AddNoteWindowComponent implements OnInit {
    notesForm: FormGroup;
    loading = false;
    submitted = false;

    @Output() discardClicked = new EventEmitter<any>();

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private markerService: MarkerService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.notesForm = this.formBuilder.group({
            description: ['', Validators.required]
        });
    }

    // to easily access form fields
    get f() { return this.notesForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.notesForm.invalid) {
            return;
        }

        this.markerService.saveNote({ description: this.f.description.value })
            .subscribe(() => {
                this.submitted = false;
                this.markerService.closeNote();
                this.markerService.loadMarkers().subscribe(() => console.log('markers updated'));
                this.f.description.setValue('');
            });
    }

    close() {
        this.f.description.setValue('');
        this.discardClicked.emit();
    }
}

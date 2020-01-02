import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { SearchType } from '../../common/constants';

@Component({
    selector: 'app-map-search-control',
    templateUrl: './map-search-control.component.html',
    styleUrls: ['./map-search-control.component.css']
})
export class MapSearchControlComponent implements OnInit {
    searchForm: FormGroup;
    loading = false;

    @Output() filterMarkers = new EventEmitter<any>();
    @Output() clearSearch = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchText: ['', []],
            seachType: [SearchType.NOTES_TEXT, Validators.required]
        });
    }

    // to easily access form fields
    get f() { return this.searchForm.controls; }

    onSubmit() {
        this.loading = true;

        if (this.searchForm.invalid) {
            return;
        }

        this.filterMarkers.emit({
            event: event,
            data: {
                seachType: this.f.seachType.value,
                searchText: this.f.searchText.value
            }
        });

        this.loading = false;
    }

    onClear = () => {
        // set markers back to all makers
        this.f.searchText.setValue('');

        this.clearSearch.emit();
    }
}

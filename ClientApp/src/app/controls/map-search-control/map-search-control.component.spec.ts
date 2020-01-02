import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchControlComponent } from './map-search-control.component';

describe('MapSearchControlComponent', () => {
  let component: MapSearchControlComponent;
  let fixture: ComponentFixture<MapSearchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSearchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

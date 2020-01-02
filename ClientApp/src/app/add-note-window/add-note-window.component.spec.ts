import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteWindowComponent } from './add-note-window.component';

describe('AddNoteWindowComponent', () => {
  let component: AddNoteWindowComponent;
  let fixture: ComponentFixture<AddNoteWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

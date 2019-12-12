import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposePage } from './compose.page';

describe('ComposePage', () => {
  let component: ComposePage;
  let fixture: ComponentFixture<ComposePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

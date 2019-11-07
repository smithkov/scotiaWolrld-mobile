import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFormPage } from './first-form.page';

describe('FirstFormPage', () => {
  let component: FirstFormPage;
  let fixture: ComponentFixture<FirstFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthFormPage } from './forth-form.page';

describe('ForthFormPage', () => {
  let component: ForthFormPage;
  let fixture: ComponentFixture<ForthFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForthFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForthFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

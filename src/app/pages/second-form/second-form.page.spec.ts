import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFormPage } from './second-form.page';

describe('SecondFormPage', () => {
  let component: SecondFormPage;
  let fixture: ComponentFixture<SecondFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

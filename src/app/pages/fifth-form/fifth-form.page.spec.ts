import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthFormPage } from './fifth-form.page';

describe('FifthFormPage', () => {
  let component: FifthFormPage;
  let fixture: ComponentFixture<FifthFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifthFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

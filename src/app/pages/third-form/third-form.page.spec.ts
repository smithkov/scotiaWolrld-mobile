import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdFormPage } from './third-form.page';

describe('ThirdFormPage', () => {
  let component: ThirdFormPage;
  let fixture: ComponentFixture<ThirdFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

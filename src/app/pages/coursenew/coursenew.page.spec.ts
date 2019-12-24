import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursenewPage } from './coursenew.page';

describe('CoursenewPage', () => {
  let component: CoursenewPage;
  let fixture: ComponentFixture<CoursenewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursenewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursenewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdatePage } from './dashboard_update.page';

describe('DashboardPage', () => {
  let component: DashboardUpdatePage;
  let fixture: ComponentFixture<DashboardUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

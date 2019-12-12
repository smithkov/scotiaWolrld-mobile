import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReadPage } from './message-read.page';

describe('MessageReadPage', () => {
  let component: MessageReadPage;
  let fixture: ComponentFixture<MessageReadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageReadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageReadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

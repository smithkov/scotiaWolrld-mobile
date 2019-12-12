import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSentPage } from './message-sent.page';

describe('MessageSentPage', () => {
  let component: MessageSentPage;
  let fixture: ComponentFixture<MessageSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

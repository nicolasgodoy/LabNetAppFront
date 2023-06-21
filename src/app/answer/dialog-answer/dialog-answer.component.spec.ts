import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnswerComponent } from './dialog-answer.component';

describe('DialogAnswerComponent', () => {
  let component: DialogAnswerComponent;
  let fixture: ComponentFixture<DialogAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

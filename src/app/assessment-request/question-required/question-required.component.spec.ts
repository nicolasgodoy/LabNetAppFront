import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRequiredComponent } from './question-required.component';

describe('QuestionRequiredComponent', () => {
  let component: QuestionRequiredComponent;
  let fixture: ComponentFixture<QuestionRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

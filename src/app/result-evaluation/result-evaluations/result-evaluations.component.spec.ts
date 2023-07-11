import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEvaluationsComponent } from './result-evaluations.component';

describe('ResultEvaluationsComponent', () => {
  let component: ResultEvaluationsComponent;
  let fixture: ComponentFixture<ResultEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

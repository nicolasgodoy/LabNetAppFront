import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSkillComponent } from './dialog-add-skill.component';

describe('DialogAddSkillComponent', () => {
  let component: DialogAddSkillComponent;
  let fixture: ComponentFixture<DialogAddSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

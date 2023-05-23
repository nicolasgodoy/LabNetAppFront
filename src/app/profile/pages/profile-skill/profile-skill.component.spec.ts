import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillComponent } from './profile-skill.component';

describe('ProfileSkillComponent', () => {
  let component: ProfileSkillComponent;
  let fixture: ComponentFixture<ProfileSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProfileBySkillComponent } from './filter-profile-by-skill.component';

describe('FilterProfileBySkillComponent', () => {
  let component: FilterProfileBySkillComponent;
  let fixture: ComponentFixture<FilterProfileBySkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProfileBySkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProfileBySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

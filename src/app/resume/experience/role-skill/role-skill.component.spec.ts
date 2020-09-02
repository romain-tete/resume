import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSkillComponent } from './role-skill.component';

describe('RoleSkillComponent', () => {
  let component: RoleSkillComponent;
  let fixture: ComponentFixture<RoleSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSkillsComponent } from './role-skills.component';

describe('RoleSkillsComponent', () => {
  let component: RoleSkillsComponent;
  let fixture: ComponentFixture<RoleSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHeadingDirective } from './role-heading.directive';

describe('RoleHeadingDirective', () => {
  let component: RoleHeadingDirective;
  let fixture: ComponentFixture<RoleHeadingDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleHeadingDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleHeadingDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

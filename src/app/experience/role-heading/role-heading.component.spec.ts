import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHeadingComponent } from './role-heading.component';

describe('RoleHeadingComponent', () => {
  let component: RoleHeadingComponent;
  let fixture: ComponentFixture<RoleHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

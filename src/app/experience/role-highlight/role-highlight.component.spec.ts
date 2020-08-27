import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHighlightComponent } from './role-highlight.component';

describe('RoleHighlightComponent', () => {
  let component: RoleHighlightComponent;
  let fixture: ComponentFixture<RoleHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

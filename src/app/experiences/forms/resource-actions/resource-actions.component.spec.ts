import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceActionsComponent } from './resource-actions.component';

describe('ResourceActionsComponent', () => {
  let component: ResourceActionsComponent;
  let fixture: ComponentFixture<ResourceActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

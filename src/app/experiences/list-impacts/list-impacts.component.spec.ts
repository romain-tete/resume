import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImpactsComponent } from './list-impacts.component';

describe('ListImpactsComponent', () => {
  let component: ListImpactsComponent;
  let fixture: ComponentFixture<ListImpactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImpactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

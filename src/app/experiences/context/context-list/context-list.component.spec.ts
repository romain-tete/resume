import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContextsComponent } from './context-list.component';

describe('ListExperiencesComponent', () => {
  let component: ListContextsComponent;
  let fixture: ComponentFixture<ListContextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListContextsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

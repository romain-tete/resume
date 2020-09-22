import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactViewComponent } from './impact-view.component';

describe('ImpactViewComponent', () => {
  let component: ImpactViewComponent;
  let fixture: ComponentFixture<ImpactViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

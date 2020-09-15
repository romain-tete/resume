import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Context,
  experienceActions,
  Impact,
  Role,
  selectors,
} from '@xcedia/experiences';

@Component({
  selector: 'xa-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.scss'],
})
export class ContextListComponent implements OnInit, OnDestroy {
  @HostBinding('role') role = 'list';

  add$: Subject<Context> = new Subject();
  contexts$: Observable<Context[]>;

  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit(): void {
    this.contexts$ = this.store.select(selectors.resources('Context'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  saveContext(resource: Context): void {
    this.store.dispatch(experienceActions.Context.save({ resource }));
  }

  addNewContext(): void {
    this.store.dispatch(experienceActions.Context.create());
  }

  save(resource: Context): void {
    this.store.dispatch(experienceActions.Context.save({ resource }));
  }

  cancel(resource: Context): void {
    this.store.dispatch(experienceActions.Context.cancel({ resource }));
  }
}

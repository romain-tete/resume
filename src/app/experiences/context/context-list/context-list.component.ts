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
  resolvedContexts$: Observable<Context[]>;
  contexts$: Observable<Context[]>;
  roles$: Observable<Role[]>;
  impacts$: Observable<Impact[]>;

  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(experienceActions.contexts.load());
    this.store.dispatch(experienceActions.roles.load());
    this.store.dispatch(experienceActions.impacts.load());
    this.contexts$ = this.store.select(selectors.resources('contexts'));
    this.roles$ = this.store.select(selectors.resources('roles'));
    this.impacts$ = this.store.select(selectors.resources('impacts'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  saveContext(resource: Context): void {
    this.store.dispatch(experienceActions.contexts.save({ resource }));
  }

  addNewContext(): void {
    this.store.dispatch(experienceActions.contexts.create());
  }

  save(resource: Context): void {
    this.store.dispatch(experienceActions.contexts.save({ resource }));
  }

  cancel(resource: Context): void {
    this.store.dispatch(experienceActions.contexts.cancel({ resource }));
  }
}

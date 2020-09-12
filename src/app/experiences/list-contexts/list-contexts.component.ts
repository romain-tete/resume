import { experiencesSelectors } from './../../../libs/experiences/experiences.selectors';
import { experienceActions } from './../../../libs/experiences/experiences.actions';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable, scheduled, Subject } from 'rxjs';
import { map, scan, startWith, takeUntil } from 'rxjs/operators';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Context } from '@xcedia/experiences';

@Component({
  selector: 'xa-list-contexts',
  templateUrl: './list-contexts.component.html',
  styleUrls: ['./list-contexts.component.scss'],
})
export class ListContextsComponent implements OnInit, OnDestroy {
  @HostBinding('role') role = 'list';

  add$: Subject<Context> = new Subject();
  resolvedContexts$: Observable<Context[]>;
  contexts$: Observable<Context[]>;

  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(experienceActions.context.load());
    this.contexts$ = this.store.select(experiencesSelectors.contexts);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  saveContext(context: Context): void {
    this.store.dispatch(experienceActions.context.save({ context }));
  }

  addNewContext(): void {
    this.store.dispatch(experienceActions.context.create());
  }
}

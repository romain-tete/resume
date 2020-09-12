import { experiencesSelectors } from './experiences.selectors';
import { Store } from '@ngrx/store';
import { ExperiencesApiService } from './experiences-api.service';
import { experienceActions as actions } from './experiences.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private experiencesAPI: ExperiencesApiService
  ) {}

  laodContexts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.context.load),
      switchMap(() => this.experiencesAPI.contextsIndex()),
      map((contexts) => actions.context.loadSuccess({ contexts }))
    )
  );

  saveContext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.context.save),
      withLatestFrom(this.store),
      switchMap(([action, globalState]) => {
        const { context } = action;
        const contextState = experiencesSelectors.contextState(context)(
          globalState
        );

        if (contextState === 'new') {
          return this.experiencesAPI.contextCreate(context);
        } else {
          return this.experiencesAPI.contextsUpdate(context);
        }
      }),
      map((context) => actions.context.saveSuccess({ context })),
      catchError((error) => of(actions.context.saveError({ error })))
    )
  );

  deleteContext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.context.delete),
      switchMap(({ context }) =>
        this.experiencesAPI.contextDelete(context).pipe(
          map(() => actions.context.deleteSuccess({ id: context.id })),
          catchError((error) => of(actions.context.deleteError({ error })))
        )
      )
    )
  );
}

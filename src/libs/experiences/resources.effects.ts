import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ExperiencesApiService, Backend } from './resources-api.service';
import { experienceActions as actions } from './resources.actions';
import { selectors } from './resources.selectors';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private experiencesAPI: ExperiencesApiService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.load),
      mergeMap(({ kind }) => {
        const backend = this.experiencesAPI.getResourceBackend(kind);
        return backend
          .index()
          .pipe(
            map((resources) => actions.loadSuccess({ kind, resources } as any))
          );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.save),
      withLatestFrom(this.store),
      mergeMap(([action, globalState]) => {
        const { resource } = action;
        const resourceState = selectors.resourceState(resource)(globalState);

        const backend = this.experiencesAPI.getResourceBackend(resource.kind);
        if (resourceState === 'new') {
          return backend.create(resource);
        } else {
          return backend.update(resource);
        }
      }),
      map((resource) => actions.saveSuccess({ resource })),
      catchError((error) => of(actions.saveError({ error })))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.delete),
      mergeMap(({ resource }) => {
        const backend = this.experiencesAPI.getResourceBackend(resource.kind);
        return backend.delete(resource).pipe(
          map(() => actions.deleteSuccess({ resource } as any)),
          catchError((error) => of(actions.deleteError({ error })))
        );
      })
    )
  );
}

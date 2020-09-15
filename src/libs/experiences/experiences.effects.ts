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

import { ExperiencesApiService, Backend } from './experiences-api.service';
import { experienceActions as actions } from './experiences.actions';
import { selectors } from './experiences.selectors';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private experiencesAPI: ExperiencesApiService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.Context.load, actions.Role.load, actions.Impact.load),
      mergeMap(({ kind }) => {
        const backend = this.experiencesAPI.getResourceBackend(kind);
        return backend
          .index()
          .pipe(
            map((resources) =>
              actions[kind].loadSuccess({ kind, resources } as any)
            )
          );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.Context.save, actions.Role.save, actions.Impact.save),
      withLatestFrom(this.store),
      mergeMap(([action, globalState]) => {
        const { resource } = action;
        const contextState = selectors.resourceState(resource)(globalState);

        const backend = this.experiencesAPI.getResourceBackend(resource.kind);
        if (contextState === 'new') {
          return backend.create(resource);
        } else {
          return backend.update(resource);
        }
      }),
      map((resource) =>
        actions[resource.kind].saveSuccess({ resource } as any)
      ),
      catchError((error) => of(actions.Context.saveError({ error })))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.Context.delete,
        actions.Role.delete,
        actions.Impact.delete
      ),
      mergeMap(({ resource }) => {
        const backend = this.experiencesAPI.getResourceBackend(resource.kind);
        return backend.delete(resource).pipe(
          map(() => actions[resource.kind].deleteSuccess({ resource } as any)),
          catchError((error) =>
            of(actions[resource.kind].deleteError({ error }))
          )
        );
      })
    )
  );
}

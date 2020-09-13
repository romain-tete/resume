import { selectors } from './experiences.selectors';
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
      ofType(actions.contexts.load),
      switchMap(() => this.experiencesAPI.contextsIndex()),
      map((contexts) => actions.contexts.loadSuccess({ resources: contexts }))
    )
  );

  saveContext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.contexts.save),
      withLatestFrom(this.store),
      switchMap(([action, globalState]) => {
        const { resource } = action;
        const contextState = selectors.resourceState(
          'contexts',
          resource
        )(globalState);

        if (contextState === 'new') {
          return this.experiencesAPI.contextCreate(resource);
        } else {
          return this.experiencesAPI.contextsUpdate(resource);
        }
      }),
      map((context) => actions.contexts.saveSuccess({ resource: context })),
      catchError((error) => of(actions.contexts.saveError({ error })))
    )
  );

  deleteContext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.contexts.delete),
      switchMap(({ resource }) =>
        this.experiencesAPI.contextDelete(resource).pipe(
          map(() => actions.contexts.deleteSuccess({ id: resource.id })),
          catchError((error) => of(actions.contexts.deleteError({ error })))
        )
      )
    )
  );

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.roles.load),
      switchMap(() =>
        this.experiencesAPI.rolesIndex().pipe(
          map((roles) => actions.roles.loadSuccess({ resources: roles })),
          catchError((error) => of(actions.roles.loadError({ error })))
        )
      )
    )
  );

  saveRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.roles.save),
      switchMap(({ resource }) =>
        this.experiencesAPI.roleUpdate(resource).pipe(
          map((savedRole) =>
            actions.roles.saveSuccess({ resource: savedRole })
          ),
          catchError((error) => of(actions.roles.saveError({ error })))
        )
      )
    )
  );
}

import { ExperiencesApiService } from './experiences-api.service';
import { experienceActions } from './experiences.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions: Actions,
    private experiencesAPI: ExperiencesApiService
  ) {}

  saveContext$ = createEffect(() =>
    this.actions.pipe(
      ofType(experienceActions.context.edit),
      switchMap((action) => this.experiencesAPI.contextsUpdate(action.payload)),
      map((context) =>
        experienceActions.context.editSuccess({ payload: context })
      ),
      catchError(() => EMPTY)
    )
  );
}

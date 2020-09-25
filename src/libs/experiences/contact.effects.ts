import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ContactAPIService } from './contact-api.service';
import { contactActions as actions } from './contact.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private service: ContactAPIService) {}

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.read),
      switchMap(() =>
        this.service.getContact().pipe(
          map((contact) => actions.readSuccess({ contact })),
          catchError((error) => of(actions.readError({ error })))
        )
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.save),
      switchMap(({ contact }) =>
        this.service.updateContact(contact).pipe(
          map((c) => actions.saveSuccess({ contact: c })),
          catchError((error) => of(actions.saveError({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.delete),
      switchMap(({ contact }) =>
        this.service.deleteContact(contact.contactName).pipe(
          map(() => actions.deleteSuccess({ contact })),
          catchError((error) => of(actions.deleteError({ error })))
        )
      )
    )
  );

  logErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.readError, actions.deleteError, actions.saveError),
        tap(({ error }) => console.error(error))
      ),
    { dispatch: false }
  );
}

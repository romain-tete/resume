import { Context, Role, Impact } from './experiences.types';
import { createAction, props } from '@ngrx/store';

export const experienceActions = {
  contexts: {
    load: createAction('[Experiences] Load contexts'),
    loadSuccess: createAction(
      '[Experiences][Success] Load contexts',
      props<{ resources: Context[] }>()
    ),
    loadError: createAction(
      '[Experiences][Error] Load contexts',
      props<{ error: Error | string }>()
    ),
    create: createAction('[Experiences] Create context'),
    cancel: createAction(
      '[Experiences] Cancel context edition',
      props<{ resource: Context }>()
    ),
    save: createAction(
      '[Experiences] Edit context',
      props<{ resource: Context }>()
    ),
    saveSuccess: createAction(
      '[Experiences][Success] Edit context',
      props<{ resource: Context }>()
    ),
    saveError: createAction(
      '[Experiences][Success] Edit context',
      props<{ error: Error | string }>()
    ),
    delete: createAction(
      '[Experiences] Delete context',
      props<{ resource: Context }>()
    ),
    deleteSuccess: createAction(
      '[Experiences][Success] Delete context',
      props<{ id: string }>()
    ),
    deleteError: createAction(
      '[Experiences][Error] Delete context',
      props<{ error: Error | string }>()
    ),
  },
  roles: {
    load: createAction('[Experiences] Load'),
    loadSuccess: createAction(
      '[Experiences][Success] Load',
      props<{ resources: Role[] }>()
    ),
    loadError: createAction(
      '[Experiences][Error] Load roles',
      props<{ error: Error }>()
    ),
    create: createAction(
      '[Experiences] Create role',
      props<{ context: Context }>()
    ),
    cancel: createAction(
      '[Experiences] Cancel role edition',
      props<{ resource: Role }>()
    ),
    save: createAction('[Experiences] Save role', props<{ resource: Role }>()),
    saveSuccess: createAction(
      '[Experiences][Success] Save Role',
      props<{ resource: Role }>()
    ),
    saveError: createAction(
      '[Experiences][Error] Save role',
      props<{ error: Error }>()
    ),
    delete: createAction(
      '[Experiences] Delete role',
      props<{ resource: Role }>()
    ),
    deleteSuccess: createAction(
      '[Experiences][Success] Delete role',
      props<{ id: string }>()
    ),
    deleteError: createAction(
      '[Experiences][Error] Delete role',
      props<{ error: Error }>()
    ),
  },
  impacts: {
    load: createAction('[Experiences] Load impacts'),
    loadSuccess: createAction(
      '[Experiences][Success] Load impacts',
      props<{ resources: Impact[] }>()
    ),
    loadError: createAction(
      '[Experiences][Error] Load impacts',
      props<{ error: Error }>()
    ),
    create: createAction(
      '[Experiences] Create impact',
      props<{ role: Role }>()
    ),
    cancel: createAction(
      '[Experiences] Cancel impact edition',
      props<{ resource: Impact }>()
    ),
    save: createAction(
      '[Experiences] Save impact',
      props<{ resource: Impact }>()
    ),
    saveSuccess: createAction(
      '[Experiences][Success] Save impact',
      props<{ resource: Impact }>()
    ),
    saveError: createAction(
      '[Experiences][Error] Save impact',
      props<{ resource: Error }>()
    ),
    delete: createAction(
      '[Experiences] Delete impact',
      props<{ resource: Impact }>()
    ),
    deleteSuccess: createAction(
      '[Experiences][Success] Delete impact',
      props<{ resource: Impact }>()
    ),
    deleteError: createAction(
      '[Experiences][Error] Delete impact',
      props<{ error: Error }>()
    ),
  },
};

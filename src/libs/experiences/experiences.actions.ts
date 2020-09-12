import { Context } from './experiences.types';
import { createAction, props } from '@ngrx/store';

export const experienceActions = {
  context: {
    load: createAction('[Experiences] Load contexts'),
    loadSuccess: createAction(
      '[Experiences][Success] Load contexts',
      props<{ contexts: Context[] }>()
    ),
    loadError: createAction(
      '[Experiences][Error] Load contexts',
      props<{ error: Error | string }>()
    ),
    create: createAction('[Experiences] Create context'),
    save: createAction(
      '[Experiences] Edit context',
      props<{ context: Context }>()
    ),
    saveSuccess: createAction(
      '[Experiences][Success] Edit context',
      props<{ context: Context }>()
    ),
    saveError: createAction(
      '[Experiences][Success] Edit context',
      props<{ error: Error | string }>()
    ),
    delete: createAction(
      '[Experiences] Delete context',
      props<{ context: Context }>()
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
};

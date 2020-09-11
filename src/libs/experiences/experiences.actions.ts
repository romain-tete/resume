import { Context } from './experiences.types';
import { createAction, props } from '@ngrx/store';

export const experienceActions = {
  context: {
    edit: createAction(
      '[Experiences] Edit context',
      props<{ payload: Context }>()
    ),
    editSuccess: createAction(
      '[Experiences][Success] Edit context',
      props<{ payload: Context }>()
    ),
    editError: createAction(
      '[Experiences][Success] Edit context',
      props<{ payload: Error | string }>()
    ),
  },
};

import { createAction, props } from '@ngrx/store';
import { Contact } from './experiences.types';
export const contactActions = {
  save: createAction(
    '[Experiences][Contact] Save',
    props<{ contact: Contact }>()
  ),
  saveSuccess: createAction(
    '[Experiences][Contact][Success] Save',
    props<{ contact: Contact }>()
  ),
  saveError: createAction(
    '[Experiences][Contact][Error] Save',
    props<{ error: any }>()
  ),
  read: createAction('[Experiences][Contact] Read'),
  readSuccess: createAction(
    '[Experiences][Contact][Success] Read',
    props<{ contact: Contact }>()
  ),
  readError: createAction(
    '[Experiences][Contact][Error] Read',
    props<{ error: any }>()
  ),
  delete: createAction(
    '[Experiences][Contact] Delete',
    props<{ contact: Contact }>()
  ),
  deleteSuccess: createAction(
    '[Experiences][Contact][Success] Delete',
    props<{ contact: Contact }>()
  ),
  deleteError: createAction(
    '[Experiences][Contact][Error] Delete',
    props<{ error: any }>()
  ),
};

import {
  Context,
  Role,
  Impact,
  ExperiencesResource,
} from './experiences.types';
import { createAction, props, Action } from '@ngrx/store';

export type WithResourceKind = {
  kind: ExperiencesResource['kind'];
};

export type WithResource = {
  resource: ExperiencesResource;
};

export type WithResourceIndex = {
  resources: ExperiencesResource[];
};
export type WithError = {
  error: Error | string;
};

export type WithParentResource = {
  parentResource?: ExperiencesResource;
};

export const resourcesActions = {
  load: createAction(
    '[Experiences][Resources] Load',
    props<WithResourceKind>()
  ),
  loadSuccess: createAction(
    '[Experiences][Resources][Success] Load',
    props<WithResourceKind & WithResourceIndex>()
  ),
  loadError: createAction(
    '[Experiences][Resources][Error] Load',
    props<WithError>()
  ),
  create: createAction(
    '[Experiences][Resources] Create',
    props<WithResource>()
  ),
  cancel: createAction(
    '[Experiences][Resources] Cancel edition',
    props<WithResource>()
  ),
  save: createAction('[Experiences][Resources] Save', props<WithResource>()),
  saveSuccess: createAction(
    '[Experiences][Resources][Success] Save',
    props<WithResource>()
  ),
  saveError: createAction(
    '[Experiences][Resources][Success] Save',
    props<WithError>()
  ),
  delete: createAction(
    '[Experiences][Resources] Delete',
    props<WithResource>()
  ),
  deleteSuccess: createAction(
    '[Experiences][Resources][Success] Delete',
    props<WithResource>()
  ),
  deleteError: createAction(
    '[Experiences][Resources][Error] Delete',
    props<WithError>()
  ),
};

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

export const experienceActions = {
  load: createAction('[Experiences] Load resources', props<WithResourceKind>()),
  loadSuccess: createAction(
    '[Experiences][Success] Load resources',
    props<WithResourceKind & WithResourceIndex>()
  ),
  loadError: createAction(
    '[Experiences][Error] Load resources',
    props<WithError>()
  ),
  create: createAction('[Experiences] Create resource', props<WithResource>()),
  cancel: createAction(
    '[Experiences] Cancel resource edition',
    props<WithResource>()
  ),
  save: createAction('[Experiences] Save resource', props<WithResource>()),
  saveSuccess: createAction(
    '[Experiences][Success] Save resource',
    props<WithResource>()
  ),
  saveError: createAction(
    '[Experiences][Success] Save resource',
    props<WithError>()
  ),
  delete: createAction('[Experiences] Delete resource', props<WithResource>()),
  deleteSuccess: createAction(
    '[Experiences][Success] Delete resource',
    props<WithResource>()
  ),
  deleteError: createAction(
    '[Experiences][Error] Delete resource',
    props<WithError>()
  ),
};

import { ExperiencesResource, isContext, isRole } from './experiences.types';
import { selectors } from './experiences.selectors';
import {
  experienceActions as actions,
  WithResourceKind,
  WithResourceIndex,
  WithResource,
  WithParentResource,
} from './experiences.actions';
import { Context, Impact, Role } from './experiences.types';
import { createReducer, on, Action, On } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

export type ExperiencesResourceState = 'new' | 'saving' | 'saved' | 'deleting';

interface ExperiencesResourceEntry {
  resource: ExperiencesResource;
  state: ExperiencesResourceState;
}

export type ExperiencesState = Record<
  ExperiencesResource['kind'],
  ExperiencesResourceEntry[]
>;

type State = ExperiencesState;

export const experiencesState: ExperiencesState = {
  Context: [],
  Role: [],
  Impact: [],
};

function loadResources(
  state: State,
  action: Action & WithResourceKind & WithResourceIndex
): State {
  return {
    ...state,
    [action.kind]: action.resources.map((r) => ({
      resource: r,
      state: 'saved',
    })),
  };
}

function createResource(state: State, action: Action & WithResource): State {
  const { resource } = action;
  const { kind } = resource;
  if (
    state[kind].length > 0 &&
    state[kind][state[kind].length - 1].state === 'new'
  ) {
    return state;
  }
  return {
    ...state,
    [kind]: [...state[kind], { resource, state: 'new' }],
  };
}

function cancelResourceEdition(
  state: State,
  action: Action & WithResource
): State {
  const resourceState = selectors.resourceState(action.resource)({
    experiences: state,
  });
  const { kind } = action.resource;

  if (resourceState === 'new') {
    const i = state[kind].map((c) => c.resource.id).indexOf(action.resource.id);
    const changed = [...state[kind]];
    changed.splice(i, 1);

    return { ...state, [kind]: changed };
  } else {
    return state;
  }
}

function saveResource(state: State, action: Action & WithResource): State {
  return setResourceValueAndState(state, action.resource, 'saving', ['saved']);
}

function savedResource(state: State, action: Action & WithResource): State {
  return setResourceValueAndState(state, action.resource, 'saved');
}

function deleteResource(state: State, action: Action & WithResource): State {
  return setResourceState(state, action.resource, 'deleting');
}

function deletedResource(state: State, action: Action & WithResource): State {
  const { id, kind } = action.resource;
  const i = state[kind].map((c) => c.resource.id).indexOf(id);
  const newResources = [...state[kind]];
  newResources.splice(i, 1);

  return { ...state, [kind]: newResources };
}

function setResourceValueAndState(
  state: State,
  resource: ExperiencesResource,
  resourceState: ExperiencesResourceState,
  onlyFromStates: ExperiencesResourceState[] = [
    'new',
    'saving',
    'saved',
    'deleting',
  ]
): State {
  const { id } = resource;
  const resources: ExperiencesResourceEntry[] = state[resource.kind];
  const i = resources.map((r) => r.resource.id).indexOf(id);
  const fromState = resources[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state[resource.kind]];
  changed.splice(i, 1, {
    resource,
    state: resourceState,
  });

  return { ...state, [resource.kind]: changed };
}

function setResourceState(
  state: State,
  resource: ExperiencesResource,
  resourceState: ExperiencesResourceState,
  onlyFromStates: ExperiencesResourceState[] = [
    'new',
    'saving',
    'saved',
    'deleting',
  ]
): State {
  const resources = state[resource.kind];
  const i = resources.map((c) => c.resource.id).indexOf(resource.id);
  const fromState = resources[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state[resource.kind]];
  changed.splice(i, 1, {
    resource: state[resource.kind][i].resource,
    state: resourceState,
  });

  return { ...state, [resource.kind]: changed };
}

export const experiencesReducer = createReducer(
  experiencesState,
  on(actions.loadSuccess, loadResources),
  on(actions.create, createResource),
  on(actions.cancel, cancelResourceEdition),
  on(actions.save, saveResource),
  on(actions.saveSuccess, savedResource),
  on(actions.delete, deleteResource),
  on(actions.deleteSuccess, deletedResource)
);

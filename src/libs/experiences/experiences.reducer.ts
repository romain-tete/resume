import { selectors } from './experiences.selectors';
import { experienceActions as actions } from './experiences.actions';
import { Context, Impact, Role } from './experiences.types';
import { createReducer, on, Action, On } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

export type ExperiencesResource = Context | Role | Impact;
export type ExperiencesResourceState = 'new' | 'saving' | 'saved' | 'deleting';

interface ExperiencesResourceEntry {
  resource: ExperiencesResource;
  state: ExperiencesResourceState;
}

export interface ExperiencesState {
  contexts: ExperiencesResourceEntry[];
  roles: ExperiencesResourceEntry[];
  impacts: ExperiencesResourceEntry[];
}

type State = ExperiencesState;

export const experiencesState: ExperiencesState = {
  contexts: [],
  roles: [],
  impacts: [],
};

function loadResources<T extends ExperiencesResource>(
  stateKey: keyof ExperiencesState
): (state: State, action: Action & { resources: T[] }) => State {
  return (state: State, action: Action & { resources: T[] }) => ({
    ...state,
    [stateKey]: action.resources.map((r) => ({ resource: r, state: 'saved' })),
  });
}

function createResource<T extends ExperiencesResource>(
  stateKey: keyof ExperiencesState,
  emptyResourceGenerator: (action: Action & { [key: string]: any }) => T
): (state: State, action: Action) => State {
  return (state: State, action: Action) => {
    if (state[stateKey][state[stateKey].length - 1].state === 'new') {
      return state;
    }

    const newResource: T = emptyResourceGenerator(action);
    return {
      ...state,
      [stateKey]: [...state[stateKey], { resource: newResource, state: 'new' }],
    };
  };
}

function cancelResourceEdition<T extends ExperiencesResource>(
  stateKey: keyof State
): (state: State, action: Action & { resource: T }) => State {
  return (state: State, action: Action & { resource: T }) => {
    const contextState = selectors.resourceState(
      stateKey,
      action.resource
    )({
      experiences: state,
    });

    if (contextState === 'new') {
      const i = state[stateKey]
        .map((c) => c.resource.id)
        .indexOf(action.resource.id);
      const changed = [...state[stateKey]];
      changed.splice(i, 1);

      return { ...state, [stateKey]: changed };
    } else {
      return state;
    }
  };
}

function saveResource(
  stateKey: keyof State
): (state: State, action: Action & { resource: ExperiencesResource }) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setContextValueAndState(state, action.resource, stateKey, 'saving', [
      'saved',
    ]);
  };
}

function savedResource(
  stateKey: keyof State
): (state: State, action: Action & { resource: ExperiencesResource }) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setContextValueAndState(state, action.resource, stateKey, 'saved');
  };
}

function deleteResource(
  stateKey: keyof ExperiencesState
): (state: State, action: Action & { resource: ExperiencesResource }) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setContextState(state, action.resource.id, stateKey, 'deleting');
  };
}

function deletedResource(
  stateKey: keyof State
): (state: State, action: Action & { id: string }) => State {
  return (state: State, action: Action & { id: string }) => {
    const i = state[stateKey].map((c) => c.resource.id).indexOf(action.id);
    const newResources = [...state[stateKey]];
    newResources.splice(i, 1);

    return { ...state, [stateKey]: newResources };
  };
}

function setContextValueAndState(
  state: State,
  resource: ExperiencesResource,
  stateKey: keyof ExperiencesState,
  resourceState: ExperiencesResourceState,
  onlyFromStates: ExperiencesResourceState[] = [
    'new',
    'saving',
    'saved',
    'deleting',
  ]
): State {
  const { id } = resource;
  const resources: ExperiencesResourceEntry[] = state[stateKey];
  const i = resources.map((r) => r.resource.id).indexOf(id);
  const fromState = resources[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state[stateKey]];
  changed.splice(i, 1, {
    resource,
    state: resourceState,
  });

  return { ...state, contexts: changed };
}

function setContextState(
  state: State,
  id: string,
  stateKey: keyof ExperiencesState,
  resourceState: ExperiencesResourceState,
  onlyFromStates: ExperiencesResourceState[] = [
    'new',
    'saving',
    'saved',
    'deleting',
  ]
): State {
  const resources = state[stateKey];
  const i = resources.map((c) => c.resource.id).indexOf(id);
  const fromState = resources[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state[stateKey]];
  changed.splice(i, 1, {
    resource: state[stateKey][i].resource,
    state: resourceState,
  });

  return { ...state, contexts: changed };
}

function contextGenerator(action: Action): Context {
  return {
    id: uuid(),
    label: null,
    kind: 'Context',
  };
}

function roleGenerator(action: Action & { context: Context }): Role {
  return {
    id: uuid(),
    kind: 'Role',
    contextId: action.context.id,
    start: null,
    end: null,
    label: null,
  };
}

function impactGenerator(action: Action & { role: Role }): Impact {
  return {
    id: uuid(),
    kind: 'Impact',
    contextId: action.role.contextId,
    roleId: action.role.id,
    description: null,
  };
}

function createReducerForResource<T extends ExperiencesResource>(
  stateKey: keyof State,
  generator: (action: Action & { [key: string]: any }) => T
): On<ExperiencesState>[] {
  return [
    on(actions[stateKey].loadSuccess, loadResources<T>(stateKey)),
    on(actions[stateKey].create, createResource<T>(stateKey, generator)),
    on(actions[stateKey].cancel, cancelResourceEdition(stateKey)),
    on(actions[stateKey].save, saveResource(stateKey)),
    on(actions[stateKey].saveSuccess, savedResource(stateKey)),
    on(actions[stateKey].delete, deleteResource(stateKey)),
    on(actions[stateKey].deleteSuccess, deletedResource(stateKey)),
  ];
}

export const experiencesReducer = createReducer.apply(createReducer, [
  experiencesState,
  ...createReducerForResource<Context>('contexts', contextGenerator),
  ...createReducerForResource<Role>('roles', roleGenerator),
  ...createReducerForResource<Impact>('impacts', impactGenerator),
]);

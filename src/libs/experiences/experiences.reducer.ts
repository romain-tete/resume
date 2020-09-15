import {
  ExperiencesResource,
  ExperiencesResourcesKind,
} from './experiences.types';
import { selectors } from './experiences.selectors';
import { experienceActions as actions } from './experiences.actions';
import { Context, Impact, Role } from './experiences.types';
import { createReducer, on, Action, On } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

export type ExperiencesResourceState = 'new' | 'saving' | 'saved' | 'deleting';

interface ExperiencesResourceEntry {
  resource: ExperiencesResource;
  state: ExperiencesResourceState;
}

export type ExperiencesState = {
  [key in ExperiencesResource['kind']]: ExperiencesResourceEntry[];
};

type State = ExperiencesState;

export const experiencesState: ExperiencesState = {
  Context: [],
  Role: [],
  Impact: [],
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

function cancelResourceEdition<T extends ExperiencesResource>(): (
  state: State,
  action: Action & { resource: T }
) => State {
  return (state: State, action: Action & { resource: T }) => {
    const contextState = selectors.resourceState(action.resource)({
      experiences: state,
    });
    const { kind } = action.resource;

    if (contextState === 'new') {
      const i = state[kind]
        .map((c) => c.resource.id)
        .indexOf(action.resource.id);
      const changed = [...state[kind]];
      changed.splice(i, 1);

      return { ...state, [kind]: changed };
    } else {
      return state;
    }
  };
}

function saveResource(): (
  state: State,
  action: Action & { resource: ExperiencesResource }
) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setResourceValueAndState(state, action.resource, 'saving', [
      'saved',
    ]);
  };
}

function savedResource(): (
  state: State,
  action: Action & { resource: ExperiencesResource }
) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setResourceValueAndState(state, action.resource, 'saved');
  };
}

function deleteResource(): (
  state: State,
  action: Action & { resource: ExperiencesResource }
) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    return setResourceState(state, action.resource, 'deleting');
  };
}

function deletedResource(): (
  state: State,
  action: Action & { resource: ExperiencesResource }
) => State {
  return (state: State, action: Action & { resource: ExperiencesResource }) => {
    const { id, kind } = action.resource;
    const i = state[kind].map((c) => c.resource.id).indexOf(id);
    const newResources = [...state[kind]];
    newResources.splice(i, 1);

    return { ...state, [kind]: newResources };
  };
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
  kind: ExperiencesResourcesKind,
  generator: (action: Action & { [key: string]: any }) => T
): On<ExperiencesState>[] {
  return [
    on(actions[kind].loadSuccess, loadResources<T>(kind)),
    on(actions[kind].create, createResource<T>(kind, generator)),
    on(actions[kind].cancel, cancelResourceEdition()),
    on(actions[kind].save, saveResource()),
    on(actions[kind].saveSuccess, savedResource()),
    on(actions[kind].delete, deleteResource()),
    on(actions[kind].deleteSuccess, deletedResource()),
  ];
}

export const experiencesReducer = createReducer(
  experiencesState,
  ...createReducerForResource<Context>('Context', contextGenerator),
  ...createReducerForResource<Role>('Role', roleGenerator),
  ...createReducerForResource<Impact>('Impact', impactGenerator)
);

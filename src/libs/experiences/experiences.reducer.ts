import { experiencesSelectors } from './experiences.selectors';
import { experienceActions } from './experiences.actions';
import { Context } from './experiences.types';
import { createReducer, on, Action } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

export type ContextState = 'new' | 'saving' | 'saved' | 'deleting';

interface ContextEntry {
  context: Context;
  state: ContextState;
}

export interface ExperiencesState {
  contexts: ContextEntry[];
}

type State = ExperiencesState;

export const experiencesState: ExperiencesState = {
  contexts: null as ContextEntry[],
};

export const experiencesReducer = createReducer(
  experiencesState,
  on(experienceActions.context.loadSuccess, loadContexts),
  on(experienceActions.context.create, create),
  on(experienceActions.context.cancel, cancel),
  on(experienceActions.context.save, save),
  on(experienceActions.context.saveSuccess, saved),
  on(experienceActions.context.delete, remove),
  on(experienceActions.context.deleteSuccess, removed)
);

function loadContexts(
  state: State,
  action: Action & { contexts: Context[] }
): State {
  return {
    ...state,
    contexts: action.contexts.map((c) => ({ context: c, state: 'saved' })),
  };
}

function create(state: State, action: Action): State {
  if (state.contexts[state.contexts.length - 1].state === 'new') {
    return state;
  }

  const newContext: Context = { id: uuid(), label: null, kind: 'Context' };
  return {
    ...state,
    contexts: [...state.contexts, { context: newContext, state: 'new' }],
  };
}

function cancel(state: State, action: Action & { context: Context }): State {
  const contextState = experiencesSelectors.contextState(action.context)({
    experiences: state,
  });

  if (contextState === 'new') {
    const i = state.contexts
      .map((c) => c.context.id)
      .indexOf(action.context.id);
    const changed = [...state.contexts];
    changed.splice(i, 1);

    return { ...state, contexts: changed };
  } else {
    return state;
  }
}

function save(
  state: State,
  action: Action & { context: Context }
): ExperiencesState {
  return setContextValueAndState(state, action.context, 'saving', ['saved']);
}

function saved(state: State, action: Action & { context: Context }): State {
  return setContextValueAndState(state, action.context, 'saved');
}

function remove(state: State, action: Action & { context: Context }): State {
  return setContextState(state, action.context.id, 'deleting');
}

function removed(state: State, action: Action & { id: string }): State {
  const i = state.contexts.map((c) => c.context.id).indexOf(action.id);
  const newContexts = [...state.contexts];
  newContexts.splice(i, 1);

  return { ...state, contexts: newContexts };
}

function setContextValueAndState(
  state: State,
  context: Context,
  contextState: ContextState,
  onlyFromStates: ContextState[] = ['new', 'saving', 'saved', 'deleting']
): State {
  const { id } = context;
  const i = state.contexts.map((c) => c.context.id).indexOf(id);
  const fromState = state.contexts[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state.contexts];
  changed.splice(i, 1, {
    ...state.contexts[i],
    context,
    state: contextState,
  });

  return { ...state, contexts: changed };
}

function setContextState(
  state: State,
  id: string,
  contextState: ContextState,
  onlyFromStates: ContextState[] = ['new', 'saving', 'saved', 'deleting']
): State {
  const i = state.contexts.map((c) => c.context.id).indexOf(id);

  const fromState = state.contexts[i].state;

  if (onlyFromStates.indexOf(fromState) === -1) {
    return state;
  }

  const changed = [...state.contexts];
  changed.splice(i, 1, {
    ...state.contexts[i],
    state: contextState,
  });

  return { ...state, contexts: changed };
}

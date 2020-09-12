import { Context } from './experiences.types';
import { ContextState, ExperiencesState } from './experiences.reducer';

type State = { experiences: ExperiencesState };

function selectContexts(state: State): Context[] {
  if (!state.experiences.contexts) {
    return [];
  } else {
    return state.experiences.contexts
      .filter((c) => c.state !== 'deleting')
      .map((ce) => ce.context);
  }
}

function contextState(context: Context): (state: State) => ContextState {
  return (s: State) => {
    const i = s.experiences.contexts
      .map((c) => c.context.id)
      .indexOf(context.id);
    return s.experiences.contexts[i].state;
  };
}

export const experiencesSelectors = {
  contexts: selectContexts,
  contextState,
};

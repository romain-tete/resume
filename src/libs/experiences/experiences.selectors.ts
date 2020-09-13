import { Context, Impact, Role } from './experiences.types';
import {
  ExperiencesResource,
  ExperiencesResourceState,
  ExperiencesState,
} from './experiences.reducer';

type State = { experiences: ExperiencesState };

function selectResources(stateKey: 'contexts'): (state: State) => Context[];
function selectResources(stateKey: 'roles'): (state: State) => Role[];
function selectResources(stateKey: 'impacts'): (state: State) => Impact[];
function selectResources(
  stateKey: keyof ExperiencesState
): (state: State) => ExperiencesResource[] {
  return (state: State) => {
    if (!state.experiences[stateKey]) {
      return [];
    } else {
      return state.experiences[stateKey]
        .filter((c) => c.state !== 'deleting')
        .map((ce) => ce.resource);
    }
  };
}

function resourceState<T extends ExperiencesResource>(
  stateKey: keyof ExperiencesState,
  resource: T
): (state: State) => ExperiencesResourceState {
  return (s: State) => {
    const i = s.experiences[stateKey]
      .map((c) => c.resource.id)
      .indexOf(resource.id);
    return s.experiences[stateKey][i].state;
  };
}

export const selectors = {
  resources: selectResources,
  resourceState,
};

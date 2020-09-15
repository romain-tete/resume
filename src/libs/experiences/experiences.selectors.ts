import {
  Context,
  Impact,
  Role,
  ExperiencesResource,
  ExperiencesResourcesKind,
} from './experiences.types';
import {
  ExperiencesResourceState,
  ExperiencesState,
} from './experiences.reducer';

type State = { experiences: ExperiencesState };

function selectResources(stateKey: 'Context'): (state: State) => Context[];
function selectResources(stateKey: 'Role'): (state: State) => Role[];
function selectResources(stateKey: 'Impact'): (state: State) => Impact[];
function selectResources(
  kind: ExperiencesResourcesKind
): (state: State) => ExperiencesResource[] {
  return (state: State) => {
    if (!state.experiences[kind]) {
      return [];
    } else {
      return state.experiences[kind]
        .filter((c) => c.state !== 'deleting')
        .map((ce) => ce.resource);
    }
  };
}

function resourceState<T extends ExperiencesResource>(
  resource: T
): (state: State) => ExperiencesResourceState {
  return (s: State) => {
    const i = s.experiences[resource.kind]
      .map((c) => c.resource.id)
      .indexOf(resource.id);
    return s.experiences[resource.kind][i].state;
  };
}

export const selectors = {
  resources: selectResources,
  resourceState,
};

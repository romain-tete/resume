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
} from './resources.reducer';

type State = { experiences: ExperiencesState };

function selectResources(
  kind: ExperiencesResourcesKind,
  parent: ExperiencesResource
): (state: State) => ExperiencesResource[] {
  return (state: State) => {
    const parentResourceId = parent ? parent.kind.toLowerCase() + 'Id' : null;

    if (!state.experiences[kind]) {
      return [];
    } else {
      return state.experiences[kind]
        .filter((r) => !parent || r.resource[parentResourceId] === parent.id)
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

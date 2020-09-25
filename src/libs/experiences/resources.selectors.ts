import {
  ExperiencesResource,
  ExperiencesResourcesKind,
} from './experiences.types';
import { EntryState, ResourcesState } from './resources.reducer';

type State = { experiences: { resources: ResourcesState } };

function selectResources(
  kind: ExperiencesResourcesKind,
  parent: ExperiencesResource
): (state: State) => ExperiencesResource[] {
  return (state: State) => {
    const parentResourceId = parent ? parent.kind.toLowerCase() + 'Id' : null;

    if (!state.experiences.resources[kind]) {
      return [];
    } else {
      return state.experiences.resources[kind]
        .filter((r) => !parent || r.resource[parentResourceId] === parent.id)
        .filter((c) => c.state !== 'deleting')
        .map((ce) => ce.resource);
    }
  };
}

function resourceState<T extends ExperiencesResource>(
  resource: T
): (state: State) => EntryState {
  return (s: State) => {
    const i = s.experiences.resources[resource.kind]
      .map((c) => c.resource.id)
      .indexOf(resource.id);
    return s.experiences.resources[resource.kind][i].state;
  };
}

export const resourcesSelectors = {
  resources: selectResources,
  resourceState,
};

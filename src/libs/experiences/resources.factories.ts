import {
  Context,
  Role,
  Impact,
  ExperiencesResource,
} from './experiences.types';
import { v4 as uuid } from 'uuid';

type Factory<T> = (...args: ExperiencesResource[]) => T;

function contextGenerator(): Context {
  return {
    id: uuid(),
    label: null,
    kind: 'Context',
  };
}

function roleGenerator(context: Context): Role {
  return {
    id: uuid(),
    kind: 'Role',
    contextId: context.id,
    start: null,
    end: null,
    label: null,
  };
}

function impactGenerator(role: Role): Impact {
  return {
    id: uuid(),
    kind: 'Impact',
    contextId: role.contextId,
    roleId: role.id,
    label: null,
  };
}

export function getResourceFactory<T extends ExperiencesResource>(
  kind: T['kind']
): Factory<T> {
  switch (kind) {
    case 'Context':
      return contextGenerator as Factory<T>;
    case 'Role':
      return roleGenerator as Factory<T>;
    case 'Impact':
      return impactGenerator as Factory<T>;
  }
}

export const resourcesFactories: Record<
  ExperiencesResource['kind'],
  (...args: [ExperiencesResource]) => ExperiencesResource
> = {
  Context: contextGenerator,
  Role: roleGenerator,
  Impact: impactGenerator,
};

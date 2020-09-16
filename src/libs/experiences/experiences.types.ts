export interface Context {
  id: string;
  label: string;
  kind: 'Context';
}

export interface Role {
  id: string;
  kind: 'Role';
  contextId: string;
  label: string;
  start: Date;
  end: Date;
}

export interface Impact {
  id: string;
  kind: 'Impact';
  contextId: string;
  roleId: string;
  label: string;
}

export type ExperiencesResource = Context | Role | Impact;
export type ExperiencesResourcesKind = ExperiencesResource['kind'];

export function isContext(resource: ExperiencesResource): resource is Context {
  return resource.kind === 'Context';
}

export function isRole(resource: ExperiencesResource): resource is Role {
  return resource.kind === 'Role';
}

export function isImpact(resource: ExperiencesResource): resource is Impact {
  return resource.kind === 'Impact';
}

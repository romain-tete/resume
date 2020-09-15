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
  description: string;
}

export type ExperiencesResource = Context | Role | Impact;
export type ExperiencesResourcesKind = ExperiencesResource['kind'];

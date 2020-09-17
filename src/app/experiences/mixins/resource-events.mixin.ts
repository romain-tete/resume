import { ExperiencesResource } from '@xcedia/experiences';
import { EventEmitter } from '@angular/core';

export function WithResourceEvents<T extends ExperiencesResource>(
  base = class {}
): new () => any {
  return class extends base {
    edit = new EventEmitter<T>();
    commit = new EventEmitter<T>();
    rollback = new EventEmitter<T>();

    delete = new EventEmitter<T>();
  };
}

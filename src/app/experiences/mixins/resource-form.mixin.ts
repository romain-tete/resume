import { FormGroup } from '@angular/forms';
import { EventEmitter, OnInit } from '@angular/core';
import { ExperiencesResource } from '@xcedia/experiences';

class empty {}

export function WithResourceForm<T extends ExperiencesResource>(
  extendedClass = empty
): new () => any {
  return class extends extendedClass {
    change = new EventEmitter<T>();
    form: FormGroup;
  };
}

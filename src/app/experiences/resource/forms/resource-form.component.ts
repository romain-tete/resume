import { ExperiencesResource } from '@xcedia/experiences';
import {
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnInit,
  Directive,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// Angular creates an error when not adding either Directive or Component decorator together with ng* functions
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ResourceFormComponent<
  T extends ExperiencesResource = ExperiencesResource
> implements OnInit, AfterViewInit {
  commit = new EventEmitter();
  rollback = new EventEmitter();
  form: FormGroup;
  resource: T;
  abstract initialFocus: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.initialFocus.nativeElement.focus();
    if (this.initialFocus.nativeElement.select) {
      this.initialFocus.nativeElement.select();
    }
  }

  abstract createForm(): void;

  doCommit(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    this.commit.emit(this.form.value);
  }

  doRollback(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    this.rollback.emit();
  }
}

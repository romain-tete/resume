import { ExperiencesResource } from '@xcedia/experiences';
import { EventEmitter, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class ResourceFormComponent implements OnInit, AfterViewInit {
  commit = new EventEmitter();
  rollback = new EventEmitter();
  form: FormGroup;
  resource: ExperiencesResource;
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

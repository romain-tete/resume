import { ExperiencesResource } from '@xcedia/experiences';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xa-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent implements OnInit, AfterViewInit, OnDestroy {
  static sequence = 0;

  @HostBinding('class') classes = 'd-flex flex-column';

  @Input() resource: ExperiencesResource;
  @Output() save = new EventEmitter<ExperiencesResource>();
  @Output() cancel = new EventEmitter<ExperiencesResource>();
  @Output() delete = new EventEmitter<ExperiencesResource>();

  @ViewChild('labelInput') editInput: ElementRef<HTMLInputElement>;
  @ViewChild('editBtn') editButton: ElementRef<HTMLButtonElement>;

  id;
  form: FormGroup;
  private destroy$ = new Subject();
  private shouldInputGrabFocus = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  state: 'editing' | 'view';
  private originalValue: ExperiencesResource;

  ngOnInit(): void {
    this.id = `resource-${this.resource.kind}-${ResourceComponent.sequence++}`;
    this.resolveStateFromInput();
    this.createFormGroup();
  }

  ngAfterViewInit(): void {
    if (this.shouldInputGrabFocus === true) {
      this.editInput.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  startEditing(): void {
    this.originalValue = { ...this.resource };
    this.state = 'editing';
    this.cd.detectChanges();

    this.editInput.nativeElement.select();
    this.editInput.nativeElement.focus();
  }

  cancelEditing(): void {
    this.cancel.emit(this.resource);
    this.state = 'view';
    this.form.setValue(this.originalValue);
    this.finalizeEdition();
  }

  doneEditing(event: Event): void {
    event.preventDefault();
    this.state = 'view';
    if (this.form.dirty) {
      this.save.emit(this.resource);
    }
    this.finalizeEdition();
  }

  doDelete(event: MouseEvent): void {
    this.delete.emit(this.resource);
  }

  private resolveStateFromInput(): void {
    if (this.resource.label) {
      this.state = 'view';
    } else {
      this.originalValue = this.resource;
      this.shouldInputGrabFocus = true;
    }

    this.state = this.resource.label ? 'view' : 'editing';
    if (!this.resource.label) {
      this.state = 'editing';
    }
  }

  private finalizeEdition(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.cd.detectChanges();
    this.editButton.nativeElement.focus();
  }

  private createFormGroup(): void {
    this.form = this.fb.group({
      id: [this.resource.id, [Validators.required]],
      label: [this.resource.label, [Validators.required]],
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.resource = { ...this.resource, ...value }));
  }
}

import { experienceActions } from './../../../libs/experiences/experiences.actions';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Context } from '@xcedia/experiences';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'xa-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextComponent implements OnInit, OnDestroy {
  static sequence = 0;

  @Input() context: Context;
  @ViewChild('labelInput') editInput: ElementRef<HTMLInputElement>;
  @ViewChild('editBtn') editButton: ElementRef<HTMLButtonElement>;

  id = `context-${ContextComponent.sequence++}`;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store<any>
  ) {}

  editing = false;
  private originalValue: Context;

  ngOnInit(): void {
    this.createFormGroup();
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.context = { ...this.context, ...value }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  startEditing(): void {
    this.originalValue = { ...this.context };
    this.editing = true;
    this.cd.detectChanges();

    this.editInput.nativeElement.select();
  }

  cancelEditing(): void {
    this.editing = false;
    this.form.get('label').setValue(this.originalValue.label);
    this.finalizeEdition();
  }

  doneEditing(event: Event): void {
    event.preventDefault();
    this.editing = false;
    if (this.form.dirty) {
      this.store.dispatch(
        experienceActions.context.edit({ payload: this.form.value })
      );
    }
    this.finalizeEdition();
  }

  private finalizeEdition(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.cd.detectChanges();
    this.editButton.nativeElement.focus();
  }

  private createFormGroup(): void {
    this.form = this.fb.group({
      id: [this.context.id, [Validators.required]],
      label: [this.context.label, [Validators.required]],
    });
  }
}

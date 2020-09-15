import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Impact } from '@xcedia/experiences';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xa-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactComponent implements OnInit, AfterViewInit, OnDestroy {
  static sequence = 0;
  @Input() impact: Impact;

  @ViewChild('descriptionInput') input: ElementRef<HTMLInputElement>;
  @ViewChild('editButton') editButton: ElementRef<HTMLButtonElement>;

  @Output() save = new EventEmitter<Impact>();
  @Output() cancel = new EventEmitter<Impact>();
  @Output() delete = new EventEmitter<Impact>();

  id = `${ImpactComponent.sequence}++`;
  state: 'editing' | 'view';
  form: FormGroup;
  private destroy$ = new Subject();
  private shouldGrabFocus = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
    this.resolveInitialState();
  }

  ngAfterViewInit(): void {
    if (this.shouldGrabFocus) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  resolveInitialState(): void {
    if (this.impact.description) {
      this.state = 'view';
    } else {
      this.state = 'editing';
      this.shouldGrabFocus = true;
    }
  }

  startEditing(): void {
    this.state = 'editing';
    this.cd.detectChanges();
    this.input.nativeElement.focus();
    this.input.nativeElement.select();
  }

  doSave(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();

    this.save.emit(this.impact);
    this.state = 'view';
    this.cd.detectChanges();
    this.editButton.nativeElement.focus();
  }

  doCancel(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();

    this.cancel.emit(this.impact);
    this.state = 'view';
    this.cd.detectChanges();
    this.editButton.nativeElement.focus();
  }

  doDelete(event: MouseEvent | KeyboardEvent): void {
    this.delete.emit(this.impact);
  }

  private createForm(): void {
    this.form = this.fb.group({
      description: [this.impact.description, Validators.required],
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newValue) => (this.impact = { ...this.impact, ...newValue }));
  }
}

import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '@xcedia/experiences';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'xa-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleComponent implements OnInit, OnDestroy, AfterViewInit {
  static sequence = 0;

  state: 'view' | 'editing';
  form: FormGroup;
  id = `roleComponent-${RoleComponent.sequence++}`;
  private destroy$ = new Subject();
  private shouldGrabFocus = false;

  @Input() role: Role;
  @Output() save = new EventEmitter<Role>();
  @Output() cancel = new EventEmitter<Role>();
  @Output() delete = new EventEmitter<Role>();
  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('editBtn') editBtn: ElementRef<HTMLButtonElement>;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
    this.resolveInitialState();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngAfterViewInit(): void {
    if (this.shouldGrabFocus) {
      this.labelInput.nativeElement.focus();
    }
  }

  resolveInitialState(): void {
    if (!!this.role.label) {
      this.state = 'view';
    } else {
      this.state = 'editing';
      this.shouldGrabFocus = true;
    }
  }

  startEditing(): void {
    this.state = 'editing';
    this.cd.detectChanges();
    this.labelInput.nativeElement.focus();
    this.labelInput.nativeElement.select();
  }

  doSave(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    this.save.emit(this.role);
    this.state = 'view';
    this.cd.detectChanges();
    this.editBtn.nativeElement.focus();
  }

  doCancel(): void {
    this.cancel.emit(this.role);
    this.state = 'view';
    this.cd.detectChanges();
    this.editBtn.nativeElement.focus();
  }

  doDelete(event: MouseEvent): void {
    this.delete.emit(this.role);
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [this.role.id, Validators.required],
      label: [this.role.label, Validators.required],
      start: [this.role.start],
      end: [this.role.end],
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newValue) => (this.role = { ...this.role, ...newValue }));
  }
}

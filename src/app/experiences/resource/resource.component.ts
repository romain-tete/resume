import { take } from 'rxjs/operators';
import { ResourceFormMutexService } from './../resource-form-mutex.service';
import { ExperiencesResource } from '@xcedia/experiences';
import { Observable, Subject, of } from 'rxjs';

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

  @ViewChild('editBtn') editButton: ElementRef<HTMLButtonElement>;

  id;
  form: FormGroup;
  private destroy$ = new Subject();
  private shouldInputGrabFocus = false;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private mutexService: ResourceFormMutexService
  ) {}

  state: 'editing' | 'view';

  ngOnInit(): void {
    this.id = `resource-${this.resource.kind}-${ResourceComponent.sequence++}`;
    this.resolveStateFromResource();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  startEditing(): void {
    this.claimMutex()
      .pipe(take(1))
      .subscribe(() => {
        this.state = 'editing';
        this.cd.detectChanges();
      });
  }

  cancelEditing(): void {
    this.yieldMutex();
    this.cancel.emit(this.resource);
    this.state = 'view';
    this.finalizeEdition();
  }

  doneEditing(event: Partial<ExperiencesResource>): void {
    this.state = 'view';
    this.save.emit({ ...this.resource, ...event } as ExperiencesResource);
    this.finalizeEdition();
  }

  doDelete(event: MouseEvent): void {
    this.delete.emit(this.resource);
  }

  requestMutexRestitution(): Observable<boolean> {
    // planning for some dialog confirmation in case the form is dirty
    this.cancelEditing();
    return of(true);
  }

  private claimMutex(): Observable<boolean> {
    return this.mutexService.claimMutex(this);
  }

  private yieldMutex(): void {
    // planning for some dialog confirmation in case the form is dirty
    return this.mutexService.yieldMutex(this);
  }

  private resolveStateFromResource(): void {
    if (this.resource.label) {
      this.state = 'view';
    } else {
      this.shouldInputGrabFocus = true;
    }

    this.state = this.resource.label ? 'view' : 'editing';
    if (!this.resource.label) {
      this.state = 'editing';
    }
  }

  private finalizeEdition(): void {
    this.cd.detectChanges();
    this.yieldMutex();
    this.editButton.nativeElement.focus();
  }
}

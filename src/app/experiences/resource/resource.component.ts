import { Store } from '@ngrx/store';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ResourceFormMutexService } from './../resource-form-mutex.service';
import {
  ExperiencesResource,
  experienceActions as actions,
  getFactory,
} from '@xcedia/experiences';
import { Observable, Subject, of, merge } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { CdkMonitorFocus } from '@angular/cdk/a11y';

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
  @Input() childrenKind: ExperiencesResource['kind'] = null;

  @ViewChild(CdkMonitorFocus) focusMonitored: CdkMonitorFocus;
  @ViewChild(CdkMonitorFocus, { read: ElementRef })
  focusMonitoredEl: ElementRef<HTMLElement>;

  id;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private mutexService: ResourceFormMutexService,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {}

  state: 'editing' | 'view';
  showActions = false;

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
        this.setState('editing');
      });
  }

  cancelEditing(): void {
    this.store.dispatch(actions.cancel({ resource: this.resource }));
    this.finalizeEdition();
  }

  doneEditing(event: Partial<ExperiencesResource>): void {
    // Optimistically retain the value to be saved
    this.resource = { ...this.resource, ...event } as ExperiencesResource;
    this.store.dispatch(actions.save({ resource: this.resource }));
    this.finalizeEdition();
  }

  doDelete(event: MouseEvent): void {
    this.store.dispatch(actions.delete({ resource: this.resource }));
  }

  doAdd(event: MouseEvent): void {
    this.store.dispatch(
      actions.create({ resource: getFactory(this.childrenKind)(this.resource) })
    );
  }

  requestMutexRestitution(): Observable<boolean> {
    // planning for some dialog confirmation in case the form is dirty
    this.cancelEditing();
    return of(true);
  }

  private setState(state: 'editing' | 'view'): void {
    this.state = state;
    this.cd.detectChanges();
  }

  private claimMutex(): Observable<boolean> {
    return this.mutexService.claimMutex(this);
  }

  private yieldMutex(): void {
    return this.mutexService.yieldMutex(this);
  }

  private resolveStateFromResource(): void {
    this.setState(this.resource.label ? 'view' : 'editing');
  }

  private finalizeEdition(): void {
    this.setState('view');
    this.focusMonitoredEl.nativeElement.focus();
    this.yieldMutex();
  }
}

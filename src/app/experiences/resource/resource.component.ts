import { ResourceRowComponent } from './resource-row/resource-row.component';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ResourceFormMutexService } from './../resource-form-mutex.service';
import {
  ExperiencesResource,
  experienceActions as actions,
  getFactory,
} from '@xcedia/experiences';
import { Observable, Subject, of, merge } from 'rxjs';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkMonitorFocus, FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'xa-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent implements OnInit, OnDestroy, FocusableOption {
  static sequence = 0;

  @HostBinding('class') classes = 'd-flex flex-column';

  @Input() resource: ExperiencesResource;
  @Input() childrenKind: ExperiencesResource['kind'] = null;

  // Using a ref here, and not the actual ResourceRowComponent type to avoid injection cycle
  @ViewChild('row') private resourceRow: FocusableOption;

  id;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private mutexService: ResourceFormMutexService
  ) {}

  state: 'editing' | 'view';
  showActions = false;

  @HostBinding('class.active')
  active = false;

  ngOnInit(): void {
    this.id = `resource-${this.resource.kind}-${ResourceComponent.sequence++}`;

    this.resolveStateFromResource();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  focus(): void {
    if (this.resourceRow) {
      this.resourceRow.focus();
    }
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
    this.yieldMutex();
    this.focus();
  }
}

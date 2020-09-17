import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ResourceFormMutexService } from './../resource-form-mutex.service';
import {
  ExperiencesResource,
  experienceActions as actions,
  getFactory,
} from '@xcedia/experiences';
import { Observable, Subject, of } from 'rxjs';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  @ViewChild('editBtn') editButton: ElementRef<HTMLButtonElement>;

  id;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private mutexService: ResourceFormMutexService,
    private el: ElementRef<HTMLElement>
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

  focus(): void {
    this.el.nativeElement.focus();
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

  private claimMutex(): Observable<boolean> {
    return this.mutexService.claimMutex(this);
  }

  private yieldMutex(): void {
    // planning for some dialog confirmation in case the form is dirty
    return this.mutexService.yieldMutex(this);
  }

  private resolveStateFromResource(): void {
    this.state = this.resource.label ? 'view' : 'editing';
  }

  private finalizeEdition(): void {
    this.state = 'view';
    this.cd.detectChanges();
    this.yieldMutex();
    this.editButton.nativeElement.focus();
  }
}

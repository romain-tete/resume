import {
  ComponentFactoryResolver,
  Directive,
  Type,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  EventEmitter,
  ComponentRef,
  Output,
  Input,
} from '@angular/core';
import { ExperiencesResource } from '@xcedia/experiences';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContextFormComponent } from './context-form/context-form.component';
import { ImpactFormComponent } from './impact-form/impact-form.component';
import { ResourceFormComponent } from './resource-form.component';
import { RoleFormComponent } from './role-form/role-form.component';

const ResourceFormMap: Record<
  ExperiencesResource['kind'],
  new () => ResourceFormComponent
> = {
  Context: ContextFormComponent as Type<ResourceFormComponent>,
  Role: RoleFormComponent as Type<ResourceFormComponent>,
  Impact: ImpactFormComponent as Type<ResourceFormComponent>,
};

@Directive({
  selector: '[xaResourceForm]',
  exportAs: 'resourceForm',
})
export class ResourceFormDirective implements OnInit, OnDestroy {
  @Input() resource: ExperiencesResource;
  @Output() commit = new EventEmitter();
  @Output() rollback = new EventEmitter();

  private componentRef: ComponentRef<ResourceFormComponent>;
  private destroy$ = new Subject();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.createComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  createComponent(): void {
    const ctor = ResourceFormMap[this.resource.kind];
    const factory = this.factoryResolver.resolveComponentFactory(ctor);
    this.componentRef = this.viewContainerRef.createComponent(factory);

    const { instance } = this.componentRef;
    instance.resource = this.resource;

    instance.commit.pipe(takeUntil(this.destroy$)).subscribe(() =>
      this.commit.emit({
        ...this.componentRef.instance.form.value,
      })
    );

    instance.rollback
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.rollback.emit());
  }
}

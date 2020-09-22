import { DefaultResourceViewComponent } from './default-resource-view/default-resource-view.component';
import { ResourceViewComponent } from './resource-view.component';
import { ExperiencesResource } from '@xcedia/experiences';
import {
  ComponentFactoryResolver,
  Directive,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ResourceComponent } from '../resource.component';

const ResourceViewsMap: Record<
  ExperiencesResource['kind'],
  new () => ResourceViewComponent
> = {
  Context: DefaultResourceViewComponent,
  Impact: DefaultResourceViewComponent,
  Role: DefaultResourceViewComponent,
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'xa-resource-view',
})
export class ResourceViewDirective implements OnInit {
  constructor(
    private resourceComponent: ResourceComponent,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.createComponent();
  }

  createComponent(): void {
    const componentClass =
      ResourceViewsMap[this.resourceComponent.resource.kind];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentClass
    );

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    componentRef.instance.resource = this.resourceComponent.resource;
  }
}

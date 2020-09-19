import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ResourceComponent } from './../resource/resource.component';
import { ExperiencesResource, selectors } from '@xcedia/experiences';
import {
  AfterContentInit,
  ContentChild,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
@Directive({
  selector: '[xaResourceList]',
  exportAs: 'resourceList',
})
export class ResourceListDirective implements OnInit, OnDestroy {
  @Input() xaResourceListLayers: ExperiencesResource['kind'][];

  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<{
      $implicit: ExperiencesResource;
      childrenKind: ExperiencesResource['kind'];
    }>,
    @Optional() private resourceComponent: ResourceComponent,
    private store: Store,
    @Optional() @SkipSelf() private parentList: ResourceListDirective,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.parentList) {
      this.xaResourceListLayers = this.parentList.xaResourceListLayers.slice(1);
    } else if (!this.xaResourceListLayers) {
      throw new Error('You must provide a value for the inputs: layers');
    }

    this.attachViews();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getResources(): Observable<ExperiencesResource[]> {
    const layer = this.xaResourceListLayers[0];
    return this.store.select(
      selectors.resources(
        layer,
        this.resourceComponent ? this.resourceComponent.resource : undefined
      )
    );
  }

  private attachViews(): void {
    const resources$ = this.getResources();

    resources$.pipe(takeUntil(this.destroy$)).subscribe((resources) => {
      this.viewContainerRef.clear();
      resources.forEach((resource) => {
        this.viewContainerRef.createEmbeddedView(this.template, {
          $implicit: resource,
          childrenKind: this.xaResourceListLayers[1] || null,
        });
      });
    });
  }
}

import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ResourceComponent } from './../resource/resource.component';
import { ExperiencesResource, selectors } from '@xcedia/experiences';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChild,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface ResourceListContext {
  $implicit: ExperiencesResource;
  childrenKind: ExperiencesResource['kind'];
}

@Directive({
  selector: '[xaResourceList]',
  exportAs: 'resourceList',
})
export class ResourceListDirective implements OnInit, OnDestroy {
  @Input() xaResourceListLayers: ExperiencesResource['kind'][];

  private destroy$ = new Subject();
  private viewCache: EmbeddedViewRef<ResourceListContext>[] = [];

  constructor(
    @Optional() private resourceComponent: ResourceComponent,
    @Optional() @SkipSelf() private parentList: ResourceListDirective,
    private template: TemplateRef<ResourceListContext>,
    private store: Store,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef
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
      this.deleteOldViews(resources);

      this.viewCache = resources.reduce((views, resource, index) => {
        const view = this.viewCache[index];

        if (!view) {
          return [...views, this.createAndInsertView(resource, index)];
        }

        if (view.context.$implicit.id === resource.id) {
          this.assignContextValues(view, resource);
          return [...views, view];
        } else {
          const elseWhereViewIndex = this.viewCache
            .map((v) => v.context.$implicit.id)
            .indexOf(resource.id);

          const elseWhereView =
            elseWhereViewIndex !== -1
              ? this.viewCache[elseWhereViewIndex]
              : null;

          if (elseWhereView) {
            this.assignContextValues(elseWhereView, resource);
            this.viewContainerRef.move(elseWhereView, index);
            return [...views, elseWhereView];
          } else {
            return [...views, this.createAndInsertView(resource, index)];
          }
        }
      }, [] as EmbeddedViewRef<ResourceListContext>[]);

      this.cd.detectChanges();
    });
  }

  private createAndInsertView(
    resource: ExperiencesResource,
    index: number
  ): EmbeddedViewRef<ResourceListContext> {
    const newView = this.viewContainerRef.createEmbeddedView(
      this.template,
      {
        $implicit: resource,
        childrenKind: this.xaResourceListLayers[1],
      },
      index
    );

    return newView;
  }

  private deleteOldViews(resources: ExperiencesResource[]): void {
    this.viewCache.forEach((v, index) => {
      const id = v.context.$implicit.id;

      if (!resources.map((r) => r.id).includes(id)) {
        this.viewContainerRef.remove(index);
      }
    });
  }

  private assignContextValues(
    view: EmbeddedViewRef<ResourceListContext>,
    resource: ExperiencesResource
  ): void {
    view.context.$implicit = resource;
    view.context.childrenKind = this.xaResourceListLayers[1];
  }
}

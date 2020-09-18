import { ResourceComponent } from './../resource/resource.component';
import { getFactory, selectors } from '@xcedia/experiences';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SkipSelf,
  ViewChildren,
} from '@angular/core';
import {
  ExperiencesResource,
  experienceActions as actions,
} from '@xcedia/experiences';
import { FocusKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'xa-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {
  @Input() layers: ExperiencesResource['kind'][];

  currentLayer = 0;
  resources$: Observable<ExperiencesResource[]>;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef<any>,
    @SkipSelf() @Optional() public parentList: ResourceListComponent,
    @Optional() private parentResource: ResourceComponent
  ) {}

  ngOnInit(): void {
    this.setLayers();
    this.setLayerClass();

    if (this.layers.length > 0) {
      this.resources$ = this.store.select(
        selectors.resources(
          this.layers[0],
          this.parentResource ? this.parentResource.resource : undefined
        )
      );
    } else {
      this.resources$ = of([]);
    }
  }

  setLayers(): void {
    if (!this.parentList && !this.layers) {
      throw new Error('No layers definition was provided.');
    }

    if (this.parentList) {
      this.layers = this.parentList.layers.slice(1);
      this.currentLayer = this.parentList.currentLayer + 1;
    }
  }

  setLayerClass(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      `resource-list-layer-${this.currentLayer}`
    );
  }

  addFirstLayerResource(): void {
    this.store.dispatch(
      actions.create({ resource: getFactory(this.layers[0])() })
    );
  }
}

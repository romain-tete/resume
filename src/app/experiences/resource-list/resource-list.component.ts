import { ResourceComponent } from './../resource/resource.component';
import { selectors } from '@xcedia/experiences';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf,
  TemplateRef,
} from '@angular/core';
import { ExperiencesResource } from '@xcedia/experiences';

@Component({
  selector: 'xa-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() layers: ExperiencesResource['kind'][];

  currentLayer = 0;

  resources$: Observable<ExperiencesResource[]>;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef<any>,
    @SkipSelf() @Optional() private parentList: ResourceListComponent,
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
    if (this.parentList && this.parentList.layers.length >= 2) {
      this.layers = this.parentList.layers.slice(1);
      this.currentLayer = this.parentList.currentLayer + 1;
    } else {
      if (!this.layers) {
        throw new Error('No layers definition was provided.');
      }
    }
  }

  setLayerClass(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      `resource-list-layer-${this.currentLayer}`
    );
  }
}

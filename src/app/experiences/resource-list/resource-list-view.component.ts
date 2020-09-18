import { ExperiencesResource } from '@xcedia/experiences';
import { ResourceListComponent } from './resource-list.component';
import { ResourceComponent } from './../resource/resource.component';
import {
  Component,
  HostListener,
  OnInit,
  HostBinding,
  AfterViewInit,
  ViewChildren,
  QueryList,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'xa-resource-list-view',
  templateUrl: './resource-list-view.component.html',
  styleUrls: ['./resource-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListViewComponent implements OnInit, AfterViewInit {
  listKey: FocusKeyManager<ResourceComponent>;
  @ViewChildren(ResourceComponent) resourceComponents: QueryList<
    ResourceComponent
  >;

  @Input() resources: ExperiencesResource[];

  layers: ExperiencesResource['kind'][];

  constructor(private container: ResourceListComponent) {}

  ngOnInit(): void {
    this.layers = this.container.layers;
  }

  ngAfterViewInit(): void {
    this.initialisteListKeyManager();
  }

  @HostListener('keydown', ['$event'])
  mapKeydownToListManager(event: KeyboardEvent): void {
    if (this.listKey) {
      this.listKey.onKeydown(event);
    }
  }

  trackById(index: number, resource: ExperiencesResource): string {
    return resource.id;
  }

  @HostListener('focus')
  proxyFocus(): void {
    if (this.resourceComponents.length > 0) {
      this.resourceComponents.first.focus();
    }
  }

  private initialisteListKeyManager(): void {
    this.listKey = new FocusKeyManager(this.resourceComponents)
      .withVerticalOrientation(true)
      .withHorizontalOrientation(null)
      .withWrap(true);
  }
}

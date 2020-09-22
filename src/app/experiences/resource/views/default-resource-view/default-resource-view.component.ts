import { ResourceViewComponent } from './../resource-view.component';
import { ExperiencesResource } from '@xcedia/experiences';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'xa-default-resource-view',
  templateUrl: './default-resource-view.component.html',
  styleUrls: ['./default-resource-view.component.scss'],
})
export class DefaultResourceViewComponent extends ResourceViewComponent {
  @Input() resource: ExperiencesResource;
}

import { ExperiencesResource } from '@xcedia/experiences';
import { Component, OnInit } from '@angular/core';
import { WithResourceEvents } from '../../mixins/resource-events.mixin';

@Component({
  selector: 'xa-resource-actions',
  templateUrl: './resource-actions.component.html',
  styleUrls: ['./resource-actions.component.scss'],
})
export class ResourceActionsComponent
  extends WithResourceEvents<ExperiencesResource>()
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  doSave(): void {
    this.save.emit();
  }

  doCancel(): void {
    this.cancel.emit();
  }
}

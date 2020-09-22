import { ResourceViewComponent } from './../resource-view.component';
import { Component, OnInit } from '@angular/core';
import { Context } from '@xcedia/experiences';

@Component({
  selector: 'xa-context-view',
  templateUrl: './context-view.component.html',
  styleUrls: ['./context-view.component.scss'],
})
export class ContextViewComponent
  extends ResourceViewComponent
  implements OnInit {
  resource: Context;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}

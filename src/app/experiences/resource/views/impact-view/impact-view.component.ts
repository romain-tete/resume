import { ResourceViewComponent } from './../resource-view.component';
import { Component, OnInit } from '@angular/core';
import { Impact } from '@xcedia/experiences';

@Component({
  selector: 'xa-impact-view',
  templateUrl: './impact-view.component.html',
  styleUrls: ['./impact-view.component.scss'],
})
export class ImpactViewComponent
  extends ResourceViewComponent
  implements OnInit {
  resource: Impact;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}

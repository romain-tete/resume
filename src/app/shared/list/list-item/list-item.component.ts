import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    role: 'listitem',
  },
})
export class ListItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

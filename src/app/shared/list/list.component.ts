import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xa-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {
    role: 'list',
  },
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

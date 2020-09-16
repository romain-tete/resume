import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { experienceActions as actions } from '@xcedia/experiences';

@Component({
  selector: 'xa-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.load({ kind: 'Context' }));
    this.store.dispatch(actions.load({ kind: 'Role' }));
    this.store.dispatch(actions.load({ kind: 'Impact' }));
  }
}

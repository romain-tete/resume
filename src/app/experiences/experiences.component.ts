import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { experienceActions } from '@xcedia/experiences';

@Component({
  selector: 'xa-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(experienceActions.contexts.load());
    this.store.dispatch(experienceActions.roles.load());
    this.store.dispatch(experienceActions.impacts.load());
  }
}

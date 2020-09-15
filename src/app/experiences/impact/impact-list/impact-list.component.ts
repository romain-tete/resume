import { RoleComponent } from '../../role/role/role.component';
import {
  Impact,
  selectors,
  Role,
  experienceActions as actions,
} from '@xcedia/experiences';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xa-impact-list',
  templateUrl: './impact-list.component.html',
  styleUrls: ['./impact-list.component.scss'],
})
export class ImpactListComponent implements OnInit {
  impacts$: Observable<Impact[]>;

  constructor(private roleComponent: RoleComponent, private store: Store) {}

  ngOnInit(): void {
    this.impacts$ = this.store
      .select(selectors.resources('Impact'))
      .pipe(
        map((impacts) =>
          impacts.filter((i) => i.roleId === this.roleComponent.role.id)
        )
      );
  }

  addImpact(): void {
    this.store.dispatch(
      actions.Impact.create({ role: this.roleComponent.role })
    );
  }

  saveImpact(impact: Impact): void {
    this.store.dispatch(actions.Impact.save({ resource: impact }));
  }

  cancelImpactEdition(impact: Impact): void {
    this.store.dispatch(actions.Impact.cancel({ resource: impact }));
  }
}

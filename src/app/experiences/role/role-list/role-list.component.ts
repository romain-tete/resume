import { ContextComponent } from './../../context/context/context.component';
import {
  Role,
  selectors,
  experienceActions as actions,
} from '@xcedia/experiences';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'xa-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  roles$: Observable<Role[]>;
  constructor(
    private contextComponent: ContextComponent,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.roles$ = this.store
      .select(selectors.resources('Role'))
      .pipe(
        map((roles) =>
          roles.filter((r) => r.contextId === this.contextComponent.context.id)
        )
      );
  }

  addRole(): void {
    this.store.dispatch(
      actions.Role.create({ context: this.contextComponent.context })
    );
  }

  saveRole(role: Role): void {
    this.store.dispatch(actions.Role.save({ resource: role }));
  }

  deleteRole(role: Role): void {
    this.store.dispatch(actions.Role.delete({ resource: role }));
  }

  cancelRoleEdition(role: Role): void {
    this.store.dispatch(actions.Role.cancel({ resource: role }));
  }

  trackById(index: number, role: Role): string {
    return role.id;
  }
}

import { ContextComponent } from './../../context/context/context.component';
import { Role, selectors } from '@xcedia/experiences';
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
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.roles$ = this.store
      .select(selectors.resources('roles'))
      .pipe(
        map((roles) =>
          roles.filter((r) => r.contextId === this.contextComponent.context.id)
        )
      );
  }
}

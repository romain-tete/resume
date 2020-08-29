import { RoleComponent } from '../role/role.component';
import {
  Component,
  OnInit,
  HostBinding,
  Directive,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({
  selector: '[xaRoleHeading]',
})
export class RoleHeadingDirective implements OnInit {
  @HostBinding('innerHtml') roleHeading = '';

  constructor(private role: RoleComponent, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.roleHeading = this.role.getRoleHeaderText();
  }
}

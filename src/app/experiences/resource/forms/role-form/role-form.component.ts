import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResourceFormComponent } from '../resource-form.component';
import { isRole, Role } from '@xcedia/experiences';

@Component({
  selector: 'xa-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  // tslint:disable-next-line: no-inputs-metadata-property
  inputs: ['resource'],
})
export class RoleFormComponent
  extends ResourceFormComponent<Role>
  implements OnInit {
  @ViewChild('initialFocus') initialFocus: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    super();
  }

  createForm(): void {
    if (!isRole(this.resource)) {
      throw new Error('The resource provided is not a Role');
    }

    this.form = this.fb.group({
      label: [this.resource.label, Validators.required],
      description: [this.resource.description],
      start: [this.resource.start || new Date(), Validators.required],
      end: [this.resource.end || new Date(), Validators.required],
    });
  }
}

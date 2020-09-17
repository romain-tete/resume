import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResourceFormComponent } from '../resource-form.component';

@Component({
  selector: 'xa-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  // tslint:disable-next-line: no-inputs-metadata-property
  inputs: ['resource'],
})
export class RoleFormComponent extends ResourceFormComponent implements OnInit {
  @ViewChild('initialFocus') initialFocus: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    super();
  }

  createForm(): void {
    this.form = this.fb.group({
      label: [this.resource.label, Validators.required],
    });
  }
}

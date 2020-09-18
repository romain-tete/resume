import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResourceFormComponent } from '../resource-form.component';

@Component({
  selector: 'xa-impact-form',
  templateUrl: './impact-form.component.html',
  styleUrls: ['./impact-form.component.scss'],
  // tslint:disable-next-line: no-inputs-metadata-property
  inputs: ['resource'],
})
export class ImpactFormComponent
  extends ResourceFormComponent
  implements OnInit {
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

import { FormBuilder, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Context, isContext } from '@xcedia/experiences';
import { ResourceFormComponent } from '../resource-form.component';

@Component({
  selector: 'xa-context-form',
  templateUrl: './context-form.component.html',
  styleUrls: ['./context-form.component.scss'],

  // Decorators can not be set in the base class
  // tslint:disable-next-line: no-inputs-metadata-property
  inputs: ['resource'],
  // tslint:disable-next-line: no-outputs-metadata-property
  outputs: ['commit', 'rollback'],
})
export class ContextFormComponent
  extends ResourceFormComponent
  implements OnInit, AfterViewInit {
  @ViewChild('initialFocus') initialFocus: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    super();
  }

  createForm(): void {
    if (!isContext(this.resource)) {
      throw new Error('The resource input is not a Context.');
    }

    this.form = this.fb.group({
      label: [this.resource.label, Validators.required],
    });
  }
}

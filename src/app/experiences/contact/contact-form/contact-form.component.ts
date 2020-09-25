import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '@xcedia/experiences';

@Component({
  selector: 'xa-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact;
  @Output() submitContact = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<Contact>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      fullname: [this.contact?.fullname || null, [Validators.required]],
      address: [this.contact?.address || null, []],
      address2: [this.contact?.address2 || null, []],
      zipcode: [this.contact?.zipcode || null, []],
      city: [this.contact?.city || null, []],
      email: [this.contact?.email || null, []],
      phoneNumber: [this.contact?.phoneNumber || null, []],
    });
  }

  doSubmit(): void {
    this.submitContact.emit(this.removeNullProperties(this.form.value));
  }

  doCancel(): void {
    this.cancel.emit();
  }

  private removeNullProperties(contact: Contact): Contact {
    const modified = { ...contact };
    for (const key in contact) {
      if (
        contact[key] === null ||
        contact[key] === undefined ||
        contact[key] === ''
      ) {
        delete modified[key];
      }
    }

    return modified;
  }
}

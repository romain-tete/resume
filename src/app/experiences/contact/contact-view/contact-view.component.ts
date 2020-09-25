import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Contact } from '@xcedia/experiences';

import { v4 as uuid } from 'uuid';

interface FieldDef {
  name: keyof Contact;
  prefix?: string;
}

interface CompositeFieldDef {
  name: string;
  composedOf: (keyof Contact)[];
  prefix?: string;
}

@Component({
  selector: 'xa-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactViewComponent implements OnInit {
  state: 'view' | 'editing' = 'view';

  fieldDefs: (FieldDef | CompositeFieldDef)[] = [
    { name: 'fullname' },
    { name: 'address' },
    { name: 'address2' },
    { name: 'zipcodeAndCity', composedOf: ['zipcode', 'city'] },
    { name: 'email', prefix: '✉: ' },
    { name: 'phoneNumber', prefix: '☎: ' },
  ];

  @Input() contact: Contact;
  constructor(private cd: ChangeDetectorRef) {}

  @Output() save = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<Contact>();

  ngOnInit(): void {}

  shouldDisplayField(def: FieldDef | CompositeFieldDef): boolean {
    if (this.isCompositeFieldDef(def)) {
      return def.composedOf.reduce(
        (shouldDisplay, field) => shouldDisplay && !!this.contact[field],
        true
      );
    } else {
      return !!this.contact[def.name];
    }
  }

  isCompositeFieldDef(
    def: FieldDef | CompositeFieldDef
  ): def is CompositeFieldDef {
    return !!(def as CompositeFieldDef).composedOf;
  }

  startEditing(): void {
    this.state = 'editing';
    this.cd.detectChanges();
  }

  stopEditing(): void {
    this.state = 'view';
    this.cd.detectChanges();
  }

  doSave(contact: Contact): void {
    this.save.emit({ id: this.contact?.id || uuid(), ...contact });
    this.stopEditing();
  }

  doDelete(): void {
    this.delete.emit(this.contact);
  }
}

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Contact, contactSelectors, contactActions } from '@xcedia/experiences';

@Component({
  selector: 'xa-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contact$: Observable<Contact>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.contact$ = this.store.select(contactSelectors.currentContact);
    this.store.dispatch(contactActions.read());
  }

  dispatchSaveAction(contact: Contact): void {
    this.store.dispatch(contactActions.save({ contact }));
  }

  dispatchDeleteAction(contact: Contact): void {
    this.store.dispatch(contactActions.delete({ contact }));
  }
}

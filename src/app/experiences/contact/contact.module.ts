import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactFormComponent, ContactViewComponent, ContactComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactModule {}

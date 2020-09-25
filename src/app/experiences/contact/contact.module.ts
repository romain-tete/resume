import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactComponent } from './contact.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [ContactFormComponent, ContactViewComponent, ContactComponent],
  imports: [CommonModule, ReactiveFormsModule, A11yModule],
  exports: [ContactComponent],
})
export class ContactModule {}

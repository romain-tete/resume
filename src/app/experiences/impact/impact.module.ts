import { ImpactListComponent } from './impact-list/impact-list.component';
import { ImpactComponent } from './impact/impact.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [ImpactComponent, ImpactListComponent],
  exports: [ImpactListComponent],
})
export class ImpactModule {}

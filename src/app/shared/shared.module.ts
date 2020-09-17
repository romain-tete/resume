import { PageHeaderModule } from './page-header/page-header.module';
import { PageTitleModule } from './page-title/page-title.module';
import { NavigationModule } from './navigation/navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthSelectorModule } from './month-selector/month-selector.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    NavigationModule,
    PageTitleModule,
    PageHeaderModule,
    MonthSelectorModule,
  ],
})
export class SharedModule {}

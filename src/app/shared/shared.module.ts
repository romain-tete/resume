import { PageHeaderModule } from './page-header/page-header.module';
import { PageTitleModule } from './page-title/page-title.module';
import { NavigationModule } from './navigation/navigation.module';
import { ListModule } from './list/list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ListModule,
    NavigationModule,
    PageTitleModule,
    PageHeaderModule,
  ],
})
export class SharedModule {}

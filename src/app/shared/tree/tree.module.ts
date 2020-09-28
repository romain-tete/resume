import { TreeEventsManagerDirective } from './tree-events-manager.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeNodeDirective } from './tree-node.directive';
import { TreeRootComponent } from './tree-root.component';

@NgModule({
  declarations: [
    TreeRootComponent,
    TreeNodeDirective,
    TreeEventsManagerDirective,
  ],
  imports: [CommonModule],
  exports: [TreeRootComponent, TreeNodeDirective, TreeEventsManagerDirective],
})
export class TreeListKeyModule {}

import { ResourceComponent } from './resource/resource.component';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { experienceActions as actions } from '@xcedia/experiences';
import { TreeNode } from '../shared/tree-list-key';

@Component({
  selector: 'xa-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.load({ kind: 'Context' }));
    this.store.dispatch(actions.load({ kind: 'Role' }));
    this.store.dispatch(actions.load({ kind: 'Impact' }));
  }

  nodeIdentity(node: TreeNode<ResourceComponent>): string {
    try {
      return node.nodeInstance.resource.id;
    } catch (e) {
      return null;
    }
  }
}

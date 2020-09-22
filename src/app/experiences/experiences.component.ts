import { NODE_IDENTITY_FN } from '../shared/tree/tree.types';
import { ResourceComponent } from './resource/resource.component';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  experienceActions as actions,
  factories,
  getFactory,
} from '@xcedia/experiences';
import { TreeNode } from '../shared/tree';

export function nodeIdentityFn(node: TreeNode<ResourceComponent>): string {
  try {
    return node.nodeInstance.resource.id;
  } catch (e) {
    return null;
  }
}

@Component({
  selector: 'xa-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
  providers: [{ provide: NODE_IDENTITY_FN, useValue: nodeIdentityFn }],
})
export class ExperiencesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.load({ kind: 'Context' }));
    this.store.dispatch(actions.load({ kind: 'Role' }));
    this.store.dispatch(actions.load({ kind: 'Impact' }));
  }

  addContext(): void {
    const newContext = getFactory('Context')();
    this.store.dispatch(actions.create({ resource: newContext }));
  }
}

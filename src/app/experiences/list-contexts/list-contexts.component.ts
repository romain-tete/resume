import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Context } from '@xcedia/experiences';

@Component({
  selector: 'xa-list-contexts',
  templateUrl: './list-contexts.component.html',
  styleUrls: ['./list-contexts.component.scss'],
})
export class ListContextsComponent implements OnInit {
  @HostBinding('role') role = 'list';

  contexts$: Observable<Context[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contexts$ = this.route.data.pipe(map((data) => data.contexts));
  }
}

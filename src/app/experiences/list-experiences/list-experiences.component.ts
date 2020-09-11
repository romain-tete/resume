import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xa-list-experiences',
  templateUrl: './list-experiences.component.html',
  styleUrls: ['./list-experiences.component.scss'],
})
export class ListExperiencesComponent implements OnInit {
  experiences$: Observable<any[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.experiences$ = this.route.data.pipe(map((data) => data.experiences));
  }
}

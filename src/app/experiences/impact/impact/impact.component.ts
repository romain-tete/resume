import { Impact } from '@xcedia/experiences';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'xa-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactComponent implements OnInit {
  @Input() impact: Impact;

  constructor() {}

  ngOnInit(): void {}
}

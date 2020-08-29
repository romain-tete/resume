import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';

import { timeBoundMixin } from '../../mixins/time-bound.mixin';

@Component({
  selector: 'xa-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent extends timeBoundMixin() implements OnChanges {
  @Input() start: string;
  @Input() end: string;
  @Input() company: string;
  @Input() location: string;

  @HostBinding('class') classes = 'row mb-4';

  startDate: Date;
  endDate: Date;

  ngOnChanges(changes: SimpleChanges): void {
    this.watchTimeInputs(changes);
  }
}

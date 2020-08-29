import {
  Component,
  Input,
  HostBinding,
  OnChanges,
  SimpleChanges,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { timeBoundMixin } from 'src/app/mixins/time-bound.mixin';

@Component({
  selector: 'xa-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent extends timeBoundMixin() implements OnChanges {
  @Input() start: string;
  @Input() end: string;
  @Input() name: string;
  @HostBinding('class') classes = 'd-block mb-2';

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.watchTimeInputs(changes);
  }

  getRoleHeaderText(): string {
    const formattedStart = this.format(this.startDate);
    const formattedEnd = this.format(this.endDate);

    return `${this.name} (${formattedStart} - ${formattedEnd})`;
  }

  private format(date: Date): string {
    return formatDate(date, 'LLL yyyy', this.locale);
  }
}

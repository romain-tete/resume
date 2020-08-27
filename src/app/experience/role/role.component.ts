import {
  Component,
  Input,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    this.watchTimeInputs(changes);
  }
}

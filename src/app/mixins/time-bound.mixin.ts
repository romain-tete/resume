import { SimpleChanges, OnChanges } from '@angular/core';
import * as moment from 'moment';

class Empty {}

export function timeBoundMixin(BaseClass = Empty) {
  return class extends BaseClass {
    startDate: Date;
    endDate: Date;

    watchTimeInputs(changes: SimpleChanges): void {
      if (changes.start) {
        this.startDate = this.parseDate(changes.start.currentValue);
      }

      if (changes.end) {
        this.endDate = this.parseDate(changes.end.currentValue);
      }
    }

    private parseDate(dateString: string): Date {
      return moment(dateString, 'DD/MM/YYYY').toDate();
    }
  };
}

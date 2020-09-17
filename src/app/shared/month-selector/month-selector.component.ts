import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  Validators,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'xa-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthSelectorComponent),
      multi: true,
    },
  ],
})
export class MonthSelectorComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  month: number;
  year: number;

  monthOptions: number[];
  yearOptions: number[];

  form: FormGroup;

  private onChange: (value: Date) => void;
  private onTouched: () => void;
  private destroy$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setMonthsOptions();
    this.setYearsOptions();

    this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  writeValue(value: Date): void {
    if (!value) {
      value = new Date();
    }

    this.month = value.getMonth();
    this.year = value.getFullYear();
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private createForm(): void {
    this.form = this.fb.group({
      month: [this.month, Validators.required],
      year: [this.year, Validators.required],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const newDate = new Date();
      newDate.setFullYear(value.year);
      newDate.setMonth(value.month);
      newDate.setDate(1);
      newDate.setHours(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);

      this.onChange(newDate);
    });
  }

  private setMonthsOptions(): void {
    const months = [];
    months.length = 12;
    for (let i = 0; i < 12; i++) {
      months[i] = i;
    }

    this.monthOptions = months;
  }

  private setYearsOptions(): void {
    const years = [];
    years.length = 130;
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 130; i++) {
      years[i] = currentYear - i;
    }

    this.yearOptions = years;
  }
}

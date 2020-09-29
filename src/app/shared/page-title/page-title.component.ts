import { Title } from '@angular/platform-browser';
import { Component, AfterContentInit, ElementRef } from '@angular/core';

@Component({
  selector: 'xa-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements AfterContentInit {
  constructor(private el: ElementRef<HTMLElement>, private title: Title) {}

  ngAfterContentInit(): void {
    this.title.setTitle(`${this.el.nativeElement.textContent}`);
  }
}

import {
  Component,
  OnInit,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'xa-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  contactShown = false;
  @ViewChild('resumeTitle', { read: ElementRef, static: true })
  titleEl: ElementRef<HTMLHeadingElement>;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.titleEl.nativeElement.innerText);
  }

  showContact(): void {
    this.contactShown = true;
  }
}

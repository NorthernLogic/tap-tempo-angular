import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { Bpm, IBpmStats } from './bpm';


@Component({
  selector: 'bpm',
  templateUrl: 'app/bpm.component.html',
  styleUrls: [
    'app/bpm.component.css',
    'app/utils.css',
  ],
})
export class BpmComponent implements OnInit {
  private bpm: Bpm = new Bpm();
  public bpmStats: IBpmStats;
  private pulseDuration: string = '0s';
  private intervalSubject: Subject<number> = new Subject<number>();

  constructor(private document: Document) {
  }


  ngOnInit() {
    this.intervalSubject
      .subscribe(ms => this.pulseDuration = ms + 'ms');
  }

  tap() {
    this.bpmStats = this.bpm.tap();
    this.intervalSubject.next(this.bpmStats ? this.bpmStats.avgMs : 0);
  }
}

import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { Bpm, IBpmStats } from './bpm';


@Component({
  selector: 'tap-bpm',
  template: `
<span class="avg">
  <span class="avg-number">{{ bpmStats ? (bpmStats.avg | number:'1.0-0') : '--' }}</span> BPM
</span>
<span class="fill-remaining-space">
  <div class="metronome" [style.animationDuration]="pulseDuration"></div>
</span>
<span>
  Min {{ bpmStats ? (bpmStats.min | number:'1.0-0') : '--' }} Max {{  bpmStats ? (bpmStats.max | number:'1.0-0') : '--'}}
</span>`,
  styles: [
    `
:host {
  display: flex;
  flex: 1 0;
  line-height: 64px;
  white-space: nowrap;
}

.avg {
  font-weight: bold;
}

.avg-number {
  font-size: 1.2em;
}

.metronome {
  flex: 0 1;
  border: 15px solid white;
  border-radius: 15px;
  width: 0;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  transform: scale(0.5);
  animation-name: pulse;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  0% { transform: scale(0.5); }
  50% { transform: scale(1); }
  100% { transform: scale(0.5); }
}`,
  `
.fill-remaining-space {
  flex: 1 1 auto;
}`,
  ],
})
export class BpmComponent implements OnInit {
  private bpm: Bpm = new Bpm();
  public bpmStats: IBpmStats;
  private pulseDuration: string = '0s';
  private intervalSubject: Subject<number> = new Subject<number>();

  ngOnInit() {
    this.intervalSubject
      .subscribe(ms => this.pulseDuration = ms + 'ms');
  }

  tap() {
    this.bpmStats = this.bpm.tap();
    this.intervalSubject.next(this.bpmStats ? this.bpmStats.avgMs : 0);
  }
}

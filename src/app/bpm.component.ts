import {
  Component,
} from '@angular/core';

import { Bpm, IBpmStats } from './bpm';

@Component({
  selector: 'bpm',
  templateUrl: 'app/bpm.component.html',
  styleUrls: [
    'app/bpm.component.css',
    'app/utils.css',
  ],
})
export class BpmComponent {
  public bpm: Bpm = new Bpm();
  public bpmStats: IBpmStats;

  private pulseDuration: number = 0;

  tap() {
    this.bpmStats = this.bpm.tap();
    this.pulseDuration = this.bpmStats ? this.bpmStats.avgMs : 0;
  }
}

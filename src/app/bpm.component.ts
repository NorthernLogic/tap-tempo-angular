import {
  Component,
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

import { Bpm, IBpmStats } from './bpm';

@Component({
  selector: 'bpm',
  templateUrl: 'app/bpm.component.html',
  styleUrls: [
    'app/bpm.component.css',
    'app/utils.css',
  ],
  animations: [
    trigger('pulseState', [
      state('stateOne, stateTwo', style({
        transform: 'scale(.5)',
      })),
      transition('* => *', [
        animate(250, keyframes([
          style({transform: 'scale(.5)'}),
          style({transform: 'scale(1)'}),
          style({transform: 'scale(.5)'}),
        ])),
      ]),
    ])
  ]
})
export class BpmComponent implements OnInit {
  public bpm: Bpm = new Bpm();
  public bpmStats: IBpmStats;

  private pulseState: string = 'stateOne';
  private intervalSubject: Subject<any>;

  ngOnInit() {
    this.intervalSubject = new Subject();
    this.intervalSubject
      .switchMap(ms => ms ? Observable.interval(ms) : Observable.empty())
      .subscribe(() => this.pulseState = this.pulseState === 'stateTwo' ? 'stateOne' : 'stateTwo');
  }

  tap() {
    this.bpmStats = this.bpm.tap();
    this.intervalSubject.next(this.bpmStats ? this.bpmStats.avgMs : null);
  }
}

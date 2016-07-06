import { Component } from '@angular/core';

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
})
export class BpmComponent {
  private bpm: Bpm = new Bpm();
  private bpmStats: IBpmStats;
  private pulseDuration: string = '0s';
  private intervalSubject: Subject<number> = new Subject<number>();
  // TODO: this should not be private, instead we should get the event
  // from the sound button
  public soundSubject: Subject<boolean> =  new Subject<boolean>();
  private pageVisibility: Observable<boolean>;

  constructor(private document: Document) {
  }

  private isVisible() {
    return document.visibilityState === 'visible';
  }

  ngOnInit() {
    const audio = new Audio();
    audio.src = "app/tick.ogg";
    audio.load();


    this.pageVisibility = Observable.merge(
      Observable.of(this.isVisible()),
      Observable.fromEvent(this.document, 'visibilitychange')
        .map(this.isVisible)
    )

    this.intervalSubject
      .subscribe(ms => this.pulseDuration = ms + 'ms')

    Observable.combineLatest(
      this.intervalSubject,
      this.pageVisibility,
      this.soundSubject
    )
      .switchMap(([ms, isVisible, soundEnabled]) => ms && isVisible && soundEnabled ? Observable.interval(ms) : Observable.empty())
      .subscribe(ms => audio.play());

    // We need to do this after all the subscriptions are setup
    this.soundSubject.next(true);
  }

  tap() {
    this.bpmStats = this.bpm.tap();
    this.intervalSubject.next(this.bpmStats ? this.bpmStats.avgMs : 0);
  }
}

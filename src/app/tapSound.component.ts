import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
 } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'tap-sound',
  template: `
  <audio #audio>
    <source src="app/tick.ogg" type="audio/ogg">
    <source src="app/tick.mp3" type="audio/mpeg">
  </audio>
  `,
  styleUrls: [],
})
export class TapSoundComponent implements OnInit, OnChanges {
  private interval$: Subject<number> = new Subject<number>();
  private sound$: Subject<boolean> =  new Subject<boolean>();
  private pageVisibility$: Observable<boolean>;

  @Input() interval: number;
  @Input() playing: boolean;
  @ViewChild('audio') audio: ElementRef;

  private isVisible() {
    return window.document.visibilityState === 'visible';
  }

  ngOnInit() {
    this.pageVisibility$ = Observable.merge(
      Observable.of(this.isVisible()),
      Observable.fromEvent(window.document, 'visibilitychange')
        .map(this.isVisible)
    );

    Observable.combineLatest(
      this.interval$,
      this.pageVisibility$,
      this.sound$
    )
      .switchMap(([ms, isVisible, soundEnabled]) => ms && isVisible && soundEnabled ? Observable.interval(ms) : Observable.empty())
      .subscribe(ms => this.audio.nativeElement.play());

    // We need to do this after all the subscriptions are setup
    this.interval$.next(this.interval);
    this.sound$.next(this.playing);
  }

  ngOnChanges(changes: any) {
    const playing = changes.playing;
    const interval = changes.interval;

    if (playing && playing.currentValue !== playing.previousValue) {
      this.sound$.next(playing.currentValue);
    }

    if (interval && interval.currentValue !== interval.previousValue) {
      this.interval$.next(interval.currentValue);
    }
  }
}

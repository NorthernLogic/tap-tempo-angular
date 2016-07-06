import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'tap-sound',
  template: '<div></div>',
  styleUrls: [],
})
export class TapSoundComponent {
  private interval$: Subject<number> = new Subject<number>();
  private sound$: Subject<boolean> =  new Subject<boolean>();
  private pageVisibility$: Observable<boolean>;

  @Input() interval: number;
  @Input() playing: boolean;
  

  constructor(private document: Document) {
  }

  private isVisible() {
    return document.visibilityState === 'visible';
  }

  ngOnInit() {
    const audio = new Audio();
    audio.src = 'app/tick.ogg';
    audio.load();

    this.pageVisibility$ = Observable.merge(
      Observable.of(this.isVisible()),
      Observable.fromEvent(this.document, 'visibilitychange')
        .map(this.isVisible)
    );

    Observable.combineLatest(
      this.interval$,
      this.pageVisibility$,
      this.sound$
    )
      .switchMap(([ms, isVisible, soundEnabled]) => ms && isVisible && soundEnabled ? Observable.interval(ms) : Observable.empty())
      .subscribe(ms => audio.play());

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

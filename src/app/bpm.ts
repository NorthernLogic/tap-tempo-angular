export interface IBpmStats {
  avgMs: number;
  avg: number;
  min: number;
  max: number;
}

export class Bpm {
  private lastTap: number;
  private max: number;
  private min: number;
  private deltaCount: number;
  private deltaSums: number;

  constructor() {
    this.reset();
  }

  tap() {
    const now = Date.now();

    if (this.lastTap) {
      const thisDelta = now - this.lastTap;

      if (thisDelta > 3000) {
        this.reset();
        return;
      }

      // This logic seems backwards as we are calculating BPM so the lower
      // the delta the higher the BPM
      if (typeof this.max === 'undefined' || this.max > thisDelta) {
        this.max = thisDelta;
      }

      if (typeof this.min === 'undefined' || this.min < thisDelta) {
        this.min = thisDelta;
      }

      this.deltaSums += thisDelta;
      this.deltaCount += 1;
    }

    this.lastTap = now;
    return this.calculate();
  };

  toBpm(ms) {
    return 1000 / ms * 60;
  };

  calculate(): IBpmStats {
    // Avoid division by zero.
    if (!this.deltaCount) {
      return;
    }

    return {
      avgMs: this.deltaSums / this.deltaCount,
      avg: this.toBpm(this.deltaSums / this.deltaCount),
      min: this.toBpm(this.min),
      max: this.toBpm(this.max),
    };
  };

  reset() {
    this.lastTap = undefined;
    this.deltaSums = 0;
    this.deltaCount = 0;
    this.min = undefined;
    this.max = undefined;
  };
}

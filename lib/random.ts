/* eslint-disable @typescript-eslint/no-explicit-any */
export class Random {
  private seed: number;

  constructor(seed: string) {
    this.seed = 0;
    for (let i = 0; i < seed.length; i++) {
      this.seed += seed.charCodeAt(i);
    }
  }

  private next(min: number, max: number) {
    max = max || 0;
    min = min || 0;

    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;

    return min + rnd * (max - min);
  }

  public nextInt(min: number, max: number) {
    return Math.round(this.next(min, max));
  }

  public nextDouble() {
    return this.next(0, 1);
  }

  public pick(collection: any[]) {
    return collection[this.nextInt(0, collection.length - 1)];
  }
}

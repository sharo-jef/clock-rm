import type { RequestHandler } from '@sveltejs/kit';

class Clock {
  private timer: number | null = null;

  private speed = 1;

  private time = 0;

  constructor() {
    this.start();
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.time += this.speed;
    }, 1000) as unknown as number;
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  get() {
    return this.time;
  }

  set(time: number) {
    this.time = time;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  getAsText() {
    const day = (Math.floor(this.time / 86400) + 1).toString().padStart(4, '0');
    const hour = Math.floor((this.time % 86400) / 3600).toString().padStart(2, '0');
    const minute = Math.floor((this.time % 3600) / 60).toString().padStart(2, '0');
    const second = (this.time % 60).toString().padStart(2, '0');
    return `${day}:${hour}:${minute}:${second}`;
  }

  getAsTextWithoutDay() {
    return this.getAsText().slice(5);
  }

  getSpeed() {
    return this.speed;
  }
}

// eslint-disable-next-line no-underscore-dangle
export const _clock = new Clock();

export const GET: RequestHandler = async () => new Response(JSON.stringify(
  {
    time: _clock.get(),
    timeAsText: _clock.getAsText(),
    timeAsTextWithoutDay: _clock.getAsTextWithoutDay(),
    speed: _clock.getSpeed(),
  },
), { status: 200 });

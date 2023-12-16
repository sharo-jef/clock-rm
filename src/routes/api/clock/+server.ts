import type { RequestHandler } from '@sveltejs/kit';

class Clock {
	day = 1;
	hour = 0;
	minutes = 0;
	seconds = 0;
	speed = 1;
	intervalId: NodeJS.Timeout | undefined;
	constructor(data?: {day?: number, hour?: number, minutes?: number, seconds?: number, speed?: number}) {
		if (data !== undefined) {
			this.set(data);
		}
	}
	set(data: {day?: number, hour?: number, minutes?: number, seconds?: number, speed?: number}) {
		if (typeof data?.day === 'number') this.day = data.day;
		if (typeof data?.hour === 'number') this.hour = data.hour;
		if (typeof data?.minutes === 'number') this.minutes = data.minutes;
		if (typeof data?.seconds === 'number') this.seconds = data.seconds;
		if (typeof data?.speed === 'number') this.speed = data.speed;
	}
	start() {
		this.intervalId = setInterval(() => {
			this.seconds += this.speed;
			if (this.seconds >= 60) {
				this.minutes += Math.floor(this.seconds / 60);
				this.seconds = this.seconds % 60;
				if (this.minutes >= 60) {
					this.hour += Math.floor(this.minutes / 60);
					this.minutes = this.minutes % 60;
					if (this.hour >= 24) {
						this.day += Math.floor(this.hour / 24);
						this.hour = this.hour % 24;
					}
				}
			}
		}, 1000);
	}
	stop() {
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}
	toObject() {
		return {
			day: this.day,
			hour: this.hour,
			minutes: this.minutes,
			seconds: this.seconds,
			speed: this.speed,
		};
	}
	toString() {
		function pad(num: number) {
			return `${num}`.padStart(2, '0');
		}
		return `${pad(this.hour)}:${pad(this.minutes)}:${pad(this.seconds)}`;
	}
}

export const _clock = new Clock();

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(_clock.toObject()));
};

export const POST: RequestHandler = async ({ request }) => {
	_clock.set(await request.json());
	return new Response(JSON.stringify(_clock.toObject()));
};
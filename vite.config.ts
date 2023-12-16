import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import { defineConfig } from 'vitest/config';

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
const clock = new Clock();

const websocket = {
	name: 'sveltekit-socket-io',
	configureServer(server) {
    const io = new Server(server.httpServer);
		io.on('connection', socket => {
			setInterval(() => {
				socket.emit('sync', clock.toObject());
				socket.emit('syncSpeed', clock.speed);
			}, 1000);
			socket.on('start', () => clock.start());
			socket.on('stop', () => clock.stop());
			socket.on('setTime', time => {
				clock.set(time);
				socket.emit('sync', clock.toString());
			});
			socket.on('setSpeed', (speed: number) => {
				clock.set({ speed });
				socket.emit('sync', clock.toString());
				socket.emit('syncSpeed', clock.speed);
			});
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), websocket],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

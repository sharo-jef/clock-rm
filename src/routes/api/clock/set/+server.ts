import type { RequestHandler } from "@sveltejs/kit";
import { _clock } from "../+server";

// start/+server.ts を参考に、set/+server.ts を作成してください

export const POST: RequestHandler = async ({ request }) => {
  const { time, speed } = await request.json();
  if (time !== undefined) {
    _clock.set(time);
  } else if (speed !== undefined) {
    _clock.setSpeed(speed);
  } else {
    return new Response(JSON.stringify({
      error: 'time または speed を指定してください',
    }), { status: 400 });
  }
  return new Response(JSON.stringify({
    time: _clock.get(),
    timeAsText: _clock.getAsText(),
    timeAsTextWithoutDay: _clock.getAsTextWithoutDay(),
    speed: _clock.getSpeed(),
  }), { status: 200 });
}

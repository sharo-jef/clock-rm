import type { RequestHandler } from "@sveltejs/kit";
import { _clock } from "../+server";

export const POST: RequestHandler = async () => {
  _clock.stop();
  return new Response(JSON.stringify({
    time: _clock.get(),
    timeAsText: _clock.getAsText(),
    timeAsTextWithoutDay: _clock.getAsTextWithoutDay(),
    speed: _clock.getSpeed(),
  }), { status: 200 });
};

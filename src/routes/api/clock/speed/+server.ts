import type { RequestHandler } from '@sveltejs/kit';

import { _clock } from '../+server';

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify({ speed: _clock.speed }));
};

export const POST: RequestHandler = async ({ request }) => {
  _clock.speed = parseInt((await request.json()).speed);
  return new Response(JSON.stringify({ speed: _clock.speed }));
};

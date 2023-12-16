import { error, type RequestHandler } from '@sveltejs/kit';

import { _clock } from '../+server';

export const GET: RequestHandler = async () => {
  if (_clock.intervalId === undefined) {
    _clock.start();
    return new Response(JSON.stringify({ status: 'started' }));
  }
  throw error(400, 'Clock already started');
};

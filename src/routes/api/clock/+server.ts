import type { RequestHandler } from '@sveltejs/kit';
import { kv } from '@vercel/kv';

export const GET: RequestHandler = async () => new Response(JSON.stringify(await kv.get<{startedAt:number,pausedAt:number,offset:number}>('data')));

export const POST: RequestHandler = async ({ request }) => {
  const currentData = await kv.get<{startedAt:number,pausedAt:number,offset:number}>('data');
  const body = await request.json();
  await kv.set('data', Object.assign((currentData || {
    startedAt: 0,
    pausedAt: 0,
    offset: 0,
    speed: 1,
  }) as object, body));
  return new Response();
};

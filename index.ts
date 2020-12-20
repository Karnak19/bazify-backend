import { Application, oakCors, send, Router } from './deps.ts';

import db from './db/index.ts';
import Song from './db/Song.ts';
import songRouter from './song.ts';

const port: number = Number(Deno.env.get('PORT')) || 80;
const app = new Application();

app.use(oakCors());
app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

app.use(songRouter.routes());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/songs`,
  });
});

app.use((ctx) => {
  ctx.response.body = 'Hello API !';
});

db.link([Song]);
// await db.sync({ drop: true });

console.log(`App is listening on PORT ${port}`);
await app.listen({ port });

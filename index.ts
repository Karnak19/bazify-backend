import { Application } from './deps.ts';

import router from './song.ts';

const port: number = Number(Deno.env.get('PORT')) || 80;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = 'Hello World !';
});

console.log(`App is listening on PORT ${port}`);
await app.listen({ port });

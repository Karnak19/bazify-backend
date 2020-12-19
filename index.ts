import { Application } from './deps.ts';

import router from './song.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = 'Hello World !';
});

console.log('App is listening on PORT 8000');
await app.listen({ port: 8000 });

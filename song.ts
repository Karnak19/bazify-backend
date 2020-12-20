import { Router, upload, emptyDirSync, moveSync } from './deps.ts';

const router = new Router();

router.post('/songs', upload('uploads', { extensions: ['mp3'] }), async (ctx: any) => {
  const { response } = ctx;
  try {
    console.log(ctx.uploadedFiles);

    const { url, filename } = ctx.uploadedFiles.file;

    moveSync(url, `./songs/${filename}`);
    emptyDirSync('./uploads');
    response.status = 201;
    response.body = {
      url: `/songs/${filename}`,
    };
  } catch (error) {
    console.error(error);

    response.status = 400;
    response.body = {
      msg: error.message,
    };
  }
});

router.post('/songs/test', async ({ request, response }) => {
  try {
    const data = await request.body().value;

    response.status = 201;
    response.body = { ...data };
  } catch (error) {
    console.error(error);

    response.status = 400;
    response.body = {
      msg: error.message,
    };
  }
});

export default router;

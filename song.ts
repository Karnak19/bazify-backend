import { Router, upload, move, emptyDir } from './deps.ts';

const router = new Router();

router.post('/songs', upload('uploads', { extensions: ['mp3'] }), async (ctx: any) => {
  const { response } = ctx;
  try {
    const { url, filename } = ctx.uploadedFiles.file;

    response.status = 201;
    response.body = {
      url: `/songs/${filename}`,
    };
    await move(url, `./songs/${filename}`);
    await emptyDir('./uploads');
  } catch (error) {
    console.log(error);
  }
});

export default router;

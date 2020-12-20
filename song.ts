import { Router, upload, emptyDir, move, v4 } from './deps.ts';
import Song from './db/Song.ts';
import { send } from 'https://deno.land/x/oak@v6.3.2/send.ts';

const router = new Router({ prefix: '/songs' });

router.get('/', async ({ response }) => {
  try {
    const songs = await Song.all();

    response.status = 200;
    response.body = songs;
  } catch (error) {
    response.status = 400;
    response.body = {
      msg: error.message,
    };
  }
});

router.post('/', upload('uploads', { extensions: ['mp3'] }), async (ctx: any) => {
  const { response } = ctx;
  try {
    if (!Array.isArray(ctx.uploadedFiles.files)) {
      ctx.uploadedFiles.files = [ctx.uploadedFiles.files];
    }

    const songs = ctx.uploadedFiles.files.map((ns: any) => {
      return {
        url: ns.url,
        filename: ns.filename,
      };
    });

    await Promise.all(
      songs.map((s: any) => {
        let goodUrl = s.url.split('/');
        goodUrl[8] = s.filename;
        goodUrl = goodUrl.join('/');
        console.log({ goodUrl, filename: s.filename });

        return move(goodUrl, `./songs/${s.filename.replace(/\s/g, '-')}`);
      })
    );

    const createdSongs = await Song.create(
      songs.map((s: any) => ({
        id: v4.generate(),
        url: `/${s.filename.replace(/\s/g, '-')}`,
        title: s.filename.replace(/-/g, ' ').replace(/.mp3/g, ''),
      }))
    );

    response.status = 201;
    response.body = createdSongs;

    await emptyDir('./uploads');
  } catch (error) {
    console.error(error);

    response.status = 400;
    response.body = {
      msg: error.message,
    };
  }
});

export default router;

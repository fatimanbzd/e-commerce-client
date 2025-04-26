import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const DIST_FOLDER = join(process.cwd(), 'dist/MehrSepand.QLand.Client.UI/browser');
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = join(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const server = express();

  const commonEngine = new CommonEngine();
  server.set('view engine', 'html');

  server.set('views', browserDistFolder);
  server.use('/assets', express.static(join(DIST_FOLDER, 'assets')));

  server.get(
    '*.*',
    express.static(DIST_FOLDER, {
      maxAge: '1y'
    })
  );
  server.get('*', (req, res, next) => {
    const { originalUrl } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: originalUrl,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
export * from './src/main.server';

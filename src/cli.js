/*
CLI
  7. Crawler crawl
  8. Take result html and path
  9. Writer write to file
  10. Stop Sever
  11. remove _tmp.html
*/
import path from 'path';

import Crawler from './Crawler';
import gatherOptions from './options';
import Server from './Server';
import Writer from './Writer';

export default (async () => {
  const options = gatherOptions();
  const basePath = path.join(process.cwd(), options.buildDir);
  const crawler = new Crawler(basePath, options.snaps.crawler);
  const server = new Server(basePath, options.snaps.server);
  const writer = new Writer(basePath, options.snaps.writer);

  writer.rename('index.html', '_tmp.html');

  await server.start();
})();

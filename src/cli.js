/*
CLI
  3. create Writer
  4. rename index.html -> _tmp.html
  5. create Server
  6. create Crawler
  7. Crawler crawl
  8. Take result html and path
  9. Writer write to file
  10. Stop Sever
  11. remove _tmp.html
*/
import path from 'path';

import gatherOptions from './options';
import Server from './Server';
import Writer from './Writer';

export default (() => {
  const options = gatherOptions();
  const basePath = path.join(process.cwd(), options.buildDir);
  const server = new Server(basePath, options.snaps.server);
  const writer = new Writer(basePath, options.snaps.writer);

  writer.rename('index.html', '_tmp.html');

  server.start();
})();

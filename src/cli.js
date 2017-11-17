/*
CLI
  8. Take result html and path
  9. Writer write to file
  10. Stop Sever
  11. remove _tmp.html
*/
import path from 'path';

import Crawler from './Crawler';
import Filter from './Filter';
import gatherOptions from './options';
import Server from './Server';
import Writer from './Writer';

export default (async () => {
  const options = gatherOptions();
  const basePath = path.join(process.cwd(), options.buildDir);
  const baseUrl = `http://localhost:${options.snaps.port}/`;

  const crawler = new Crawler(baseUrl, options.snaps.snapshotDelay);
  const filter = new Filter(options.snaps.stripReact);
  const server = new Server(basePath, options.snaps.port);
  const writer = new Writer(basePath, options.snaps.onlyIndex);

  writer.rename('index.html', '_tmp.html');

  try {
    await server.start();
  } catch(error) {
    console.log(error);
  }

  await crawler.crawl((urlPath, dom) => {
    const filteredDOM = filter.filterDOMtoString(dom);
    writer.writeHtml(urlPath, filteredDOM);
    server.stop();
  });
})();

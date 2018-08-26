import path from 'path';

import Crawler from './Crawler';
import filterDomtoString from './filterDomtoString';
import Server from './Server';
import writeHtml from './writeHtml';

module.exports = async function run(args, flags) {
  const {
    buildDir = 'build',
    port = '3020',
    snapshotDelay = 300,
  } = flags;

  const outPath = path.join(process.cwd(), buildDir);
  const baseUrl = `http://localhost:${port}/`;

  const crawler = new Crawler(baseUrl, snapshotDelay);
  const server = new Server(outPath, port);

  try {
    await server.start();
  } catch(error) {
    console.log(error);
  }

  await crawler.crawl((urlPath, dom) => {
    const serializedDOM = filterDomtoString(dom);
    writeHtml(urlPath, serializedDOM, outPath);
  });

  server.stop();
};

import path from 'path';
import React from 'react';

import Crawler from './Crawler';

module.exports = async function run(args, flags) {
  const {
    buildDir = 'build',
    tmpDir = 'tmp',
  } = flags;

  const outPath = path.join(process.cwd(), buildDir);
  const tmpPath = path.join(process.cwd(), tmpDir);

  const Page = require(path.join(tmpPath, 'sissi-script')).default;
  const content = require(path.join(process.cwd(), 'content.json'));

  const crawler = new Crawler(Page, content);

  await crawler.crawl();

  const staticPages = crawler.getStaticPages();
  console.log(staticPages);

  // TODO
  // load html
  // remove sissi-script.js from html
  // insert static page for each route
  // save to build dir
};

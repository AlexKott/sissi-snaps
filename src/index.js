import fs from 'fs';
import path from 'path';
import React from 'react';

import Crawler from './Crawler';
import writeToFiles from './writeToFiles';
import { SISSI_SCRIPT } from './constants';

module.exports = async function run(args, flags) {
  const {
    buildDir = 'build',
    tmpDir = 'tmp',
  } = flags;

  const outPath = path.join(process.cwd(), buildDir);
  const tmpPath = path.join(process.cwd(), tmpDir);
  const scriptPath = path.join(tmpPath, 'sissi-script');
  const indexHtmlPath = path.join(tmpPath, 'index.html');
  const contentJsonPath = path.join(process.cwd(), 'content.json');

  const Page = require(scriptPath).default;
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const content = require(contentJsonPath);

  const template = indexHtml.replace(SISSI_SCRIPT, '');

  const crawler = new Crawler(Page, content, template);
  const staticPages = await crawler.crawl();

  await writeToFiles(staticPages, outPath);
};

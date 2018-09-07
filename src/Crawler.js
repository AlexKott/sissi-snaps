import { renderStatic } from 'sissi-guides';

import * as c from './constants';

export default class Crawler {
  constructor(Page, content) {
    this.Page = Page;
    this.content = content;
    this.paths = [''];
    this.staticPages = {};
  }

  getStaticPages() {
    return this.staticPages;
  }

  async crawl(callback) {
    this.callback = callback;
    return new Promise(resolve => {
      this.takeSnapshot(this.paths.shift(), resolve);
    });
  }

  async takeSnapshot(pathName, resolve) {
    if (pathName === undefined) {
      return resolve();
    }

    if (this.staticPages[pathName]) {
      return this.takeSnapshot(this.paths.shift(), resolve);
    }

    const staticPage = renderStatic(this.Page, this.content, pathName);
    this.staticPages[pathName] = staticPage;

    this.extractLinks(staticPage);

    this.takeSnapshot(this.paths.shift(), resolve);
  }

  extractLinks(staticPage) {
    let anchorElem = c.SISSI_LINK.exec(staticPage);

    while (anchorElem) {
      const hrefMatch = c.LINK_HREF.exec(anchorElem[0]) || [];
      const href = hrefMatch[2] || '';
      const target = c.TARGET_FILTER.exec(href)[1];

      if (!this.staticPages[target]) {
        this.paths.push(target);
      }

      anchorElem = c.SISSI_LINK.exec(staticPage);
    }
  }
}

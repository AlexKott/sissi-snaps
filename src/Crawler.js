import { renderStatic } from 'sissi-guides';

import * as c from './constants';

export default class Crawler {
  constructor(Page, content, template) {
    this.Page = Page;
    this.content = content;
    this.template = template;

    this.paths = [''];
    this.staticPages = {};
  }

  async crawl() {
    return new Promise(resolve => {
      this.takeSnapshot(this.paths.shift(), resolve);
    });
  }

  takeSnapshot(pathName, resolve) {
    if (pathName === undefined) {
      return resolve(this.staticPages);
    }

    if (!this.staticPages[pathName]) {
      const staticPage = renderStatic(this.Page, this.content, pathName);
      this.staticPages[pathName] = this.insertContent(staticPage);

      this.extractLinks(staticPage);
    }

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

  insertContent(staticPage) {
    return this.template.replace(c.SISSI_CONTAINER, `$1${staticPage}$4`);
  }
}

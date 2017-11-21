import jsdom from 'jsdom';
import url from 'url';

const { JSDOM } = jsdom;

export default class Crawler {
  constructor(baseUrl, snapshotDelay = 0) {
    this.baseUrl = baseUrl;
    this.paths = [];
    this.paths.push('');
    this.processedPaths = {};
    this.snapshotDelay = snapshotDelay;
  }

  async crawl(callback) {
    this.callback = callback;
    console.log('Crawling...');
    return new Promise((resolve, reject) => {
      this.takeSnapshot(this.paths.shift(), resolve, reject);
    });
  }

  async takeSnapshot(urlPath, resolve, reject) {
    if (urlPath === undefined) {
      console.log('Crawling finished.');
      return resolve();
    }

    const pathName = url.resolve('', urlPath);

    const snapUrl = this.baseUrl + pathName;
    let dom;

    if (this.processedPaths[pathName]) {
      return this.takeSnapshot(this.paths.shift(), resolve, reject);
    }
    this.processedPaths[pathName] = true;

    try {
      dom = await JSDOM.fromURL(snapUrl, {
        resources: 'usable',
        runScripts: 'dangerously',
      });
    } catch(error) {
      console.log(error);
    }

    setTimeout(() => {
      this.callback(urlPath, dom);
      this.extractLinks(dom);
      try {
        this.takeSnapshot(this.paths.shift(), resolve, reject);
      } catch(error) {
        console.log(error);
      }
    }, this.snapshotDelay);
  }

  extractLinks(dom) {
    const anchors = Array.from(dom.window.document.querySelectorAll('a[data-type="sissi-internal"]'));
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href')
      const pathName = href ? href.replace(/^\//, '') : '';

      if (pathName && !this.processedPaths[pathName]) {
        this.paths.push(pathName);
      }
    });
  }
}

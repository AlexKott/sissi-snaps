/*
CRAWLER
  5. Remove webpack script, remove react ids, empty react elements
  6. Extract new _internal_ links, add them to paths-array

  7. jsdom serialize document
  8. send html and path information to provided callback
*/
import jsdom from 'jsdom';
import url from 'url';

const { JSDOM } = jsdom;

export default class Crawler {
  constructor(baseUrl, { snapshotDelay = 0 }) {
    this.baseUrl = baseUrl;
    this.paths = [];
    this.paths.push('');
    this.processedPaths = {};
    this.snapshotDelay = snapshotDelay;
  }

  async crawl(callback) {
    this.callback = callback;
    console.log('Crawling...');
    try {
      await this.takeSnapshot(this.paths.shift());
    } catch(error) {
      console.log(error);
    }
    console.log('Finished crawling.');
  }

  async takeSnapshot(urlPath) {
    let dom;
    const pathName = url.resolve('', urlPath);
    const snapUrl = this.baseUrl + pathName;

    if (this.processedPaths[pathName]) {
      return takeSnapshot(this.paths.shift());
    }
    this.processedPaths[pathName] = true;

    try {
      dom = await JSDOM.fromURL(snapUrl, {
        resources: 'usable',
        runScripts: 'dangerously',
      });
    } catch(error) {
      console.log(error);
    } finally {
      setTimeout(() => this.callback(dom), this.snapshotDelay);
    }
  }
}

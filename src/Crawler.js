/*
CRAWLER
  1. Use paths-array with '/' as initial starting value
  2. Keep Map with all processed paths

  3. Shift paths-array, check if is processed
  4. If not processed: Take snapshot

  5. Remove webpack script, remove react ids, empty react elements
  6. Extract new _internal_ links, add them to paths-array

  7. jsdom serialize document
  8. send html and path information to provided callback
*/

export default class Crawler {
  constructor(basePath) {
    this.basePath = basePath;
  }
}

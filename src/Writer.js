/***
  rename: changes name of a file inside the basePath (if a file with that name
  exists, it gets overwritten!)
  writeHtml: Save a html string to a file with the given name inside the
  basePath. If onlyIndex is true the file gets saved as index.html inside a new
  directory.
***/
import fs from 'fs';
import { sync as mkDirPSync } from 'mkdirp';
import path from 'path';

export default class Writer {
  constructor(basePath, { onlyIndex = true }) {
    this.basePath = basePath;
    this.onlyIndex = true;
  }

  rename(from, to) {
    const fromPath = path.join(this.basePath, from);
    const toPath = path.join(this.basePath, to);

    if (fs.existsSync(fromPath)) {
      fs.renameSync(fromPath, toPath);
    }
  }

  writeHtml(fileName, content) {
    let fileNameWithEnding;
    if (this.onlyIndex) {
      fileNameWithEnding = `${fileName}/index.html`;
    } else {
      fileNameWithEnding = `${fileName}.html`;
    }

    const filePath = path.join(this.basePath, fileNameWithEnding);
    const dirName = path.dirname(filePath);

    mkDirPSync(dirName);
    fs.writeFileSync(filePath, content);
  }
}

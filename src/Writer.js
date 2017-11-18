import fs from 'fs';
import { sync as mkDirPSync } from 'mkdirp';
import path from 'path';

export default class Writer {
  constructor(basePath, onlyIndex = true) {
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
    if (!fileName) {
      fileNameWithEnding = 'index.html';
    } else if (this.onlyIndex) {
      fileNameWithEnding = `${fileName}/index.html`;
    } else {
      fileNameWithEnding = `${fileName}.html`;
    }

    const filePath = path.join(this.basePath, fileNameWithEnding);
    const dirName = path.dirname(filePath);

    mkDirPSync(dirName);
    fs.writeFileSync(filePath, content);
  }

  remove(fileName) {
    fs.unlinkSync(path.join(this.basePath, fileName));
  }
}

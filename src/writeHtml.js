import fs from 'fs';
import { sync as mkDirPSync } from 'mkdirp';
import path from 'path';

export default function writeHtml(fileName, content, outPath) {
  let fileNameWithEnding;
  if (!fileName) {
    fileNameWithEnding = 'index.html';
  } else {
    fileNameWithEnding = `${fileName}/index.html`;
  }

  const filePath = path.join(outPath, fileNameWithEnding);
  const dirName = path.dirname(filePath);

  mkDirPSync(dirName);
  fs.writeFileSync(filePath, content);
}

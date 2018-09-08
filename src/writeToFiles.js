import fs from 'fs';
import { sync as mkDirPSync } from 'mkdirp';
import path from 'path';

export default function writeToFiles(staticPages, outPath) {
  Object.entries(staticPages).forEach(([pathName, content]) => {
    const dirName = path.join(outPath, pathName);
    const filePath = path.join(dirName, 'index.html');

    mkDirPSync(dirName);
    fs.writeFileSync(filePath, content);
  });
}

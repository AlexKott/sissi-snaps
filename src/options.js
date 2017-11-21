import fs from 'fs';
import path from 'path';

export default function gatherOptions() {
  const defaultOptionsFile = fs.readFileSync(path.join(__dirname, '..', '.sissi_default'));
  const defaultOptions = JSON.parse(defaultOptionsFile);
  const defaultSnapOptions = defaultOptions.snaps;

  if (fs.existsSync(path.join(process.cwd(), '.sissi'))) {
    const customOptionsFile = fs.readFileSync(path.join(process.cwd(), '.sissi'));
    const customOptions = JSON.parse(customOptionsFile);
    const customSnapOptions = customOptions.snaps;
    const mergedSnapOptions = Object.assign({}, defaultSnapOptions, customSnapOptions);

    customOptions.snaps = mergedSnapOptions;

    return Object.assign({}, defaultOptions, customOptions);
  }

  return defaultOptions;
}

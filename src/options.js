import fs from 'fs';
import path from 'path';

export default function gatherOptions() {
  const defaultOptionsFile = fs.readFileSync(path.join(__dirname, '..', '.sissi_default'));
  const defaultOptions = JSON.parse(defaultOptionsFile);

  if (fs.existsSync(path.join(process.cwd(), '.sissi'))) {
    const customOptionsFile = fs.readFileSync(path.join(process.cwd(), '.sissi'));
    const customOptions = JSON.parse(customOptionsFile);

    return Object.assign({}, defaultOptions, customOptions);
  }

  return defaultOptions;
}

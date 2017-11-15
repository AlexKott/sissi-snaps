/***
  The server is opening all static files in the buildPath (especially
  important for the *.js files).
  For all accessed routes it returns the temporary (webpack) html file, so
  that the frontend router can take over.
***/

import express from 'express';
import path from 'path';

export default class Server {
  constructor(buildDir = 'build') {
    this.PORT = 3231;
    const buildPath = path.join(process.cwd(), buildDir);
    const app = express();

    app.use(express.static(buildPath));
    app.get('*', (req, res) => res.sendFile(path.join(buildPath, '_tmp.html')));

    this.app = app;
  }

  getPort() {
    return this.instance.address().port;
  }

  start() {
    this.instance = this.app.listen(this.PORT, () => {
      console.log('Server is listening...');
    });
  }

  stop() {
    this.instance.close();
  }
}

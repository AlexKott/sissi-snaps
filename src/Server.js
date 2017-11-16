/***
  The server is opening all static files in the basePath (especially
  important for the *.js files).
  For all accessed routes it returns the temporary (webpack) html file, so
  that the frontend router can take over.
***/

import express from 'express';
import path from 'path';

export default class Server {
  constructor(basePath, { port = 3231 }) {
    const app = express();

    app.use(express.static(basePath));
    app.get('*', (req, res) => res.sendFile(path.join(basePath, '_tmp.html')));

    this.port = port;
    this.app = app;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.instance = this.app.listen(this.port, (err) => {
        if (err) reject(err);

        console.log(`Webserver is listening on port ${this.port}... `);
        resolve();
      });
    });
  }

  stop() {
    this.instance.close();
  }
}

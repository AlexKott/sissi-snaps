import express from 'express';
import path from 'path';

export default class Server {
  constructor(outPath, port = 3231) {
    const app = express();
    const basePath = process.cwd();

    app.use(express.static(outPath));
    app.get('/sissi/__content__', (req, res) => res.sendFile(path.join(basePath, 'content.json')));
    app.get('*', (req, res) => res.sendFile(path.join(outPath, '_tmp.html')));

    this.port = port;
    this.app = app;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.instance = this.app.listen(this.port, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  stop() {
    this.instance.close();
  }
}

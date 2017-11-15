/*
CLI
  1. setup source and build directory
  2. setup snapshot delay (50ms)

  if (!fs.existsSync(buildDir)) throw new Error(`No build directory exists at: ${buildDirPath}`);

  3. create Writer
  4. rename index.html -> _tmp.html
  5. create Server
  6. create Crawler
  7. Crawler crawl
  8. Take result html and path
  9. Writer write to file
  10. Stop Sever
  11. remove _tmp.html
*/
import Server from './Server';

export default (() => {
  const server = new Server();
  server.start();
})();

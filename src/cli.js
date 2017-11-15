/*
CLI
  1. setup source and build directory
  2. setup snapshot delay (50ms)

  if (!fs.existsSync(buildDir)) throw new Error(`No build directory exists at: ${buildDirPath}`);

  3. create Writer
  4. create Server
  5. create Crawler
  6. Crawler crawl
  7. Take result html and path
  8. Writer write to file
  9. Stop Sever
*/

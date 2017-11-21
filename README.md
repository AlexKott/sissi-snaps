# sissi-snaps

## Introduction
_Sissi-snaps_ is part of [sissi](https://github.com/AlexKott/sissi), a simple static site generator. Because _sissi_ doesn't like to do everything on herself, she employs some modules who can help. _Sissi_ is still young and the modules might change from time to time to adjust to her different life situations.

Of course you can use _sissi-snaps_ independently as well if it fits your needs. Just consider that the main goal for the module is, to make _sissi_ happy. Everything else is just an extra.

## Installation
When you're asking for _sissi_, _sissi-snaps_ is already included. For every other use case just do the usual:

`yarn add sissi-snaps`

or

`npm i sissi-snaps`

## Usage
When you're working with _sissi_ there's not much to do. She is good at managing and will make sure that _sissi-snaps_ does its job. If you want to use this module independently you will have to make sure that all of the preconditions are set.

As with other command line tools you have to use the _bin_. You'll do that by entering `sissi-snaps` or `node_modules/.bin/sissi-snaps` (yes, it's that simple). The tool will start looking for an _index.html_ inside your _build directory_. The file get's opened in [jsdom](https://github.com/tmpvar/jsdom) and after a _timeout_ (during which the JavaScript can be executed) a snapshot will be saved. The original _index.html_ will be overwritten.

All internal links will be opened and stored as own _.html files_. By default these links will be stored as _path/index.html_, but you can change that setting if you like.

## Configuration
You can change all settings by making a _.sissi_ file in your directory.

### buildDir
Where your _index.html_ is found and all other files will be saved at.

Default: `build`.
```
{
  "buildDir": "myOwnBuildDir"
}
```
(Note that this setting must be specified at top level, because it will be used by other _sissi_-servants as well.)

### port
An [express](https://github.com/expressjs/express) server is used to deliver the files to _jsdom_. You can specify the port it will use.

Default: `3231`
```
{
  "snaps": {
    "port": 8000
  }
}
```

### snapshotDelay
_Jsdom_ will need some time to process the JavaScript in your HTML files. Sometimes it will throw an error because some elements couldn't be found. You can try increasing the _snapshotDelay_ to fix this.

Default: `300`
```
{
  "snaps": {
    "snapshotDelay": 500
  }
}
```

### onlyIndex
This will change whether you receive your files as _filename/index.html_ or _filename.html_.

Default: `true`
```
{
  "snaps": {
    "onlyIndex": false
  }
}
```

### removeTemplateScript
Since you're generating static sites you probably don't want to deliver the JavaScript code that the templates were built on. However, you can choose to let [React](https://github.com/facebook/react) take over once the HTML files are loaded.

Default: `true`
```
{
  "snaps": {
    "removeTemplateScript": false
  }
}
```

## Contributing
This is just one of several things that _sissi_ needs for her well being. It is important to keep all settings focussed on her so that she'll always be the center.

Feel free to open an issue or [get in touch](https://alexkott.com), if you're interested in helping _sissi_ through her childhood or see some parenting mistake that you'd like to fix.


## Credits
_Sissi-snaps_ was heavily inspired by [react-snapshots](https://github.com/geelen/react-snapshot/).

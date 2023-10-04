# Pylp

A streamlined task runner designed for simplicity.

## Installation

```
npm install pylp
```

## Usage

Create a `pylp.js` in the root of your project:

```javascript
const { task, src, dest } = require('pylp');

task('copy-html', function () {
  return src('./src/*.html').pipe(dest('./dist'));
});
```
Run your task using:
```
pylp copy-html
```

For custom configurations, use the --config or -c flag:
```
pylp copy-html --config path/to/customConfig.js
```

## Features

- Flexible task definitions
- Stream-based builds with Vinyl-FS
- Enhanced logging with Winston

## API

`task([taskName,] fn)`

Both a getter and setter for tasks. Read more [here](https://github.com/gulpjs/undertaker#tasktaskname-fn)

`series(taskName || fn...)`

Takes a variable amount of strings (taskName) and/or functions (fn) and returns a function of the composed tasks or functions. Read more [here](https://github.com/gulpjs/undertaker#seriestaskname--fn)

`parallel(taskName || fn...)`

Takes a variable amount of strings (taskName) and/or functions (fn) and returns a function of the composed tasks or functions. Read more [here](https://github.com/gulpjs/undertaker#paralleltaskname--fn)

`src(globs[, options])`

Takes a glob string or an array of glob strings as the first argument and an options object as the second. Returns a stream of vinyl File objects. Read more [here](https://github.com/gulpjs/vinyl-fs#srcglobs-options).

`dest(folder[, options])`

Takes a folder path string or a function as the first argument and an options object as the second. Read more [here](https://github.com/gulpjs/vinyl-fs).

## License
MIT
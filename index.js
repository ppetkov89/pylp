const taker = require('./src/tasks/taker');
var vfs = require('vinyl-fs');

module.exports = {
  taker: taker,
  task: taker.task.bind(taker),
  src: vfs.src.bind(vfs),
  dest: vfs.dest.bind(vfs),
  series: taker.series.bind(taker),
  parallel: taker.parallel.bind(taker)
};
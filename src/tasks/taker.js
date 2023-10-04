const Undertaker = require('undertaker');
const logWrapper = require('../utils/logWrapper');

const taker = new Undertaker();
const originalTakerTask = taker.task.bind(taker);

const taskWithLog = (taskName, taskFunc) => originalTakerTask(taskName, logWrapper(taskName, taskFunc));

taker.task = taskWithLog;

module.exports = taker;

const logger = require('./logger');

const logWrapper = (taskName, taskFunc) => {
  if (typeof taskFunc !== 'function') {
    throw new TypeError(`Expected taskFunc to be a function, but received ${typeof taskFunc}`);
  }

  return function wrappedTask(cb) {
    logger.info(`Starting ${taskName}...`);

    let taskResult;
    try {
      taskResult = taskFunc(cb);
    } catch (err) {
      logger.error(`Error executing ${taskName}: ${err.message}`);
      cb(err);
      return;
    }

    // If taskResult has an 'on' method, it's probably a stream or event emitter.
    if (taskResult && typeof taskResult.on === 'function') {
      taskResult
        .on('end', () => logger.done(`Finished ${taskName}`))
        .on('error', err => logger.error(`Error in ${taskName}: ${err.message}`));
    }

    return taskResult;
  };
};

module.exports = logWrapper;

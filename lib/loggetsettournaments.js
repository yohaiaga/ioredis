const expectedCommands = ['hset', 'hmset', 'hget', 'hmget'];
const expectedKeyRegex = /events:.*/;
let currentLogger = null;

function logSetGetTournamentsCommand(action, command, logger = currentLogger) {
  if (!logger) return;
  const { name, args } = command;
  const [key, field, payload] = args;
  if (field === 'tournaments' && expectedCommands.includes(name) && expectedKeyRegex.test(key)) {
    logger.info('REDIS COMMAND LOG TOURNAMENTS ' + action, { name, key, field, payload });
  }
}

module.exports = {
  logSetGetTournamentsCommand,
  setLogger: (theLogger) => currentLogger = theLogger,
};

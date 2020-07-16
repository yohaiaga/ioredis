const expectedCommands = ['hset', 'hmset', 'hget', 'hmget', 'hgetall'];
const getCommands = ['hget', 'hset', 'hgetall'];

const expectedKeyRegex = /events:.*/;
let currentLogger = null;

function logSetGetTournamentsCommand(action, command, logger = currentLogger) {
  if (!logger || !command) return;
  const { name, args } = command;
  let key, field, payload;
  if (Array.isArray(args)) [key, field, payload] = args;
  if (field === 'tournaments' && expectedCommands.includes(name) && expectedKeyRegex.test(key)) {
    logger.warn('REDIS COMMAND LOG TOURNAMENTS ' + action , { name, key, field, payload });
  }

  if (getCommands.includes(name)) {
    logger.warn('REDIS COMMAND LOG GET COMMAND ' + action, { name, key, field, payload, args });
  }
}

module.exports = {
  logSetGetTournamentsCommand,
  setLogger: (theLogger) => currentLogger = theLogger,
};

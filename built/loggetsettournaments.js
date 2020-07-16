const expectedCommands = ['hset', 'hmset'];
const getCommands = ['hget', 'hset', 'hgetall'];
const expectedKeyRegex = /events:.*/;
let currentLogger = null;
function logSetGetTournamentsCommand(action, command, logger = currentLogger) {
    if (!logger || !command)
        return;
    const { name, args } = command;
    let key, field, payload;
    if (Array.isArray(args))
        [key, field, payload] = args;
    if (expectedCommands.includes(name) && (field === 'tournaments' || expectedKeyRegex.test(key))) {
        logger.warn('REDIS COMMAND LOG SET TOURNAMENTS ' + action, { name, key, field, payload });
    }
    if (getCommands.includes(name) && (field === 'tournaments' || expectedKeyRegex.test(key))) {
        logger.warn('REDIS COMMAND LOG GET COMMAND ' + action, { name, key, field, result: command.payload, args });
    }
}
module.exports = {
    logSetGetTournamentsCommand,
    setLogger: (theLogger) => {
        if (theLogger)
            currentLogger = theLogger;
        else
            console.log('No logger provided');
    }
};

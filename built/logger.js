let logger;
module.exports = {
    logData: function (msg, data) {
        if (logger) {
            logger.error(`#### ${msg}`, data);
        }
    },
    setLogger: function (loggerToSet) {
        logger = loggerToSet;
        logger.error(`#### logger was set`);
    }
};

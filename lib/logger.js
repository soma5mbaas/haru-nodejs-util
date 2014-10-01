var winston = require('winston');
var defaultConfig = require('./loggerConfig');

module.exports = function( logFilename, loggerConfig ) {
	loggerConfig = loggerConfig || defaultConfig;

	var consoleConfig = loggerConfig.console;
	var fileConfig = loggerConfig.file;

	fileConfig.filename = logFilename;

	var transports = [];

	if( Object.keys(consoleConfig).length > 0 ) { transports.push(new winston.transports.Console(consoleConfig)); }
	if( Object.keys(fileConfig).length > 0 ) { transports.push(new winston.transports.File(fileConfig)); }

	var logger = new winston.Logger({
		levels: loggerConfig.levels,
		colors: loggerConfig.colors,
		transports: transports,
		exitOnError: loggerConfig.exitOnError
	});

	return logger;
};
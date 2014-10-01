
var utils = require('./index');

var keys = utils.keys;
console.log( keys.schemaKey('asd','123') );

var common = utils.common;
console.log( common.exportSchema({ name: "asd", age: 12}) );

var errorCode = utils.errorCode;
console.log(errorCode.INVALID_USER_TOKEN);

var Logger = utils.Logger;

var log = new Logger('./error.txt');
log.info('asd');
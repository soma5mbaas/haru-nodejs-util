
var utils = require('./index');

// var keys = utils.keys;
// console.log( keys.schemaKey('asd','123') );

var common = utils.common;
// console.log( common.exportSchema({ name: "asd", age: 12}) );

// var errorCode = utils.errorCode;
// console.log(errorCode.INVALID_USER_TOKEN);

// var Logger = utils.Logger;

// var log = new Logger('./error.txt');
// log.info('asd');

// var parseToJson = common.parseToJson;
// var sjon = { age: '11'};
// var schema = { age: 'number'};
// console.log(  typeof parseToJson(schema, sjon).age );

// var parseToJsons = common.parseToJsons;
// var sjons = [ { age: '11'}, {name: 'park', age:'25'} ] ;
// var schema2 = { age: 'number', name: 'string'};
// console.log(  typeof parseToJsons(schema2, sjons)[0].age );

var isEmptyObject = common.isEmptyObject;
var obj1 = {};
var obj2 = {name: 'park'};

console.log(isEmptyObject(obj1))
console.log(isEmptyObject(obj2))


var UserSchema = utils.models.User;

console.log(UserSchema.schema);


var obj = {
    name: 'pcw',
    array: [1, 2,3],
    strArray: ['1', '2', '3'],
    object: {
        name: 'wer',
        array: [1,2,3]
    }
};

var str = JSON.stringify(obj);

console.log( str );

var errorCode = require('./errorCode');
var _ = require('underscore');
var keys = require('./keys');
var uid2 = require('uid2');


function getAPIInfo( req ) {
	var api = {};

	if( api.id = req.get('Rest-API-Id') ) {
		api.type = 'rest';
	} else if( api.id = req.get('Android-API-Id') ) {
		api.type = 'android';
	} else if( api.id = req.get('Ios-API-Id') ) {
		api.type = 'ios';
	} else if( api.id = req.get('Javascript-API-Id') ) {
		api.type = 'javascript';
	}

	return api;
};

exports.getHeader = function( req ) {
	var header = {};

	// 기본 정보 
	header.applicationId = req.get('Application-Id');
	header.api = getAPIInfo( req );
	header.timestamp = Date.now();

	// 옵션 정보
    if( req.get('Session-Token') ) header.sessionToken = req.get('Session-Token');
	if( req.params.classname ) header.class = req.params.classname;
	if( req.params._id ) header._id = req.params._id;  

	return header;
};

exports.sendError = function(res, error, logger, level) {
    if( error.status && error.info ) {
        _log(error, logger, level);
        return res.status( error.status ).json( error.info );
    } else {
        _log(error, logger, level);
        return res.status( errorCode.OTHER_CAUSE.status ).json( errorCode.OTHER_CAUSE.info );
    }
};

function _log(error, logger, level) {
    var format = '[%d:%d] %s : %s'; // [status] info: stack

    if(logger && level && typeof logger[level] === 'function') {
        if( error.status && error.info ) {
            logger[level](format, Date.now(), error.status, error.info);
        } else {
            logger[level](format, Date.now(), errorCode.OTHER_CAUSE.status, errorCode.OTHER_CAUSE.info.error, error.stack);
        }
    }
}

// json의 schema와 데이터 타입을 배열로 만들어 리턴한다.
exports.exportSchema = function( object, baseSchema ) {
    baseSchema = baseSchema || {};

    var properties = _.union( Object.keys( baseSchema), Object.keys(object) );
    var schema = [];

    properties.forEach(function(property) {
        if( baseSchema[property] ) {
            schema.push( property + '.' + baseSchema[property] );
            return;
        }

        var value = object[property];

        var type = typeof value;
        if(baseSchema && baseSchema[property]) {
            type = baseSchema[property];
        }
        else if( type === 'object' && Array.isArray(value) ) {
            type = 'array';
        }
        else if( type === 'object' && Object.prototype.toString.call(value) === '[object Date]' ) {
            type = 'date';
        }

        schema.push( property + '.' + type );
    });

    return schema;

};

exports.exportSchemaToJson = function( object, baseSchema ) {
    baseSchema = baseSchema || {};
    var properties = _.union( Object.keys( baseSchema), Object.keys(object) );
    var schema = {};

    properties.forEach(function(property) {
        if( baseSchema[property] ) {
            schema[property] = baseSchema[property];
            return;
        }

        var value = object[property];

        var type = typeof value;
        if(baseSchema && baseSchema[property]) {
            type = baseSchema[property];
        }
        else if( type === 'object' && Array.isArray(value) ) {
            type = 'array';
        }
        else if( type === 'object' && Object.prototype.toString.call(value) === '[object Date]' ) {
            type = 'date';
        }
        else if( type === 'object' && Object.prototype.toString.call(value) === '[object Object]') {
            type = 'object';
        }

        schema[property] = type ;
    });

    return schema;
};

// JSON objejct 의 value 를 string 으로 parsing 한다.
exports.parseToString = function( json ) {
	var properties = Object.keys( json );
	var newJson = {};
	properties.forEach(function(property) {
		newJson[property] = json[property].toString();
	});

	return newJson;
};

exports.deepCopy = function(object) {
	var newObject = Object.keys(object).reduce(function (obj, item) {
		obj[item] = object[item];
		return obj;
	},{});

	return newObject;
}

exports.parseToJsons = function( schema, jsons ) {
	jsons.forEach(function(json) {
		json = exports.parseToJson(schema, json);
	});

	return jsons;
}

exports.parseToJson = function (schema, json) {
    if( schema == null || json == null ) { throw new Error('NullPointException')}

	var keys = Object.keys(schema);
    for( var i = 0; i < keys.length; i++ ) {
        var key = keys[i];

        if( json[key] != null ) {
            if (schema[key] === 'number') {
                json[key] = Number(json[key]);
            } else if (schema[key] === 'boolean') {
                json[key] = Boolean(json[key] == '1' || json[key] == 'true' || json[key] == 'TRUE');
            } else if (schema[key] === 'array') {
                json[key] = json[key].split(',');
            } else if (schema[key] === 'date') {
                json[key] = Number(json[key]);
            } else if (schema[key] === 'object') {
                json[key] = JSON.parse(json[key]);
            }
        }
    }
	return json;
};

exports.isEmptyObject = function(object) {
	return Object.keys(object).length === 0 ;
};

exports.injectJson = function(dst, src) {
    if( dst == null || src == null ) { return new Error('NullPointException')}

    var keys = Object.keys(src);
    keys.forEach(function(key) {
       dst[key] = src[key];
    });

    return dst;
};

exports.getShardKey = function(entityId) {
    return entityId.substring(0, 1);
};


exports.createEntityId = function(options, callback) {
    var shardKey = '0';
    var redisKey = keys.shardSetKey();
    var public = options.public;

    if( !options.timestamp ) {
        options.timestamp = Date.now();
    }

    public.zrange(redisKey, 0, 0, function(error, key){
        if( key.length >= 1 ) {
            shardKey = key[0];
            public.zincrby(redisKey, 1, key[0]);
        }

        return callback( error, shardKey + uid2(7)+ options.timestamp + process.pid, shardKey );
    });
};

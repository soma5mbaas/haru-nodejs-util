

module.exports = new Keys('ns');

function Keys(ns) {
	this.ns = ns || 'ns';
};


/**
* Redis
* **/
Keys.prototype.setNameSpace = function( ns ) {
	this.ns = ns;
};

Keys.prototype.schemaKey = function(applicationId, className) {
	return this.ns + ':schema:'+ className + ':' +  applicationId;
};

Keys.prototype.entityDetail = function( className, _id, applicationId ) {
	return this.ns+':'+className+':'+_id+':'+applicationId+':detail';
};

Keys.prototype.entityKey = function( className, applicationId ) {
	return this.ns+':'+className+':'+applicationId+':keys';
};

Keys.prototype.tokenIdKey = function(applicationId, token) {
    return this.ns+':token:'+token+':'+applicationId;
};

Keys.prototype.idTokenKey = function(applicationId, _id) {
    return this.ns+':token:'+_id+':'+applicationId+':keys';
};

Keys.prototype.classesKey = function(applicationId) {
   return this.ns+':classes:'+applicationId;
};

/**
 * Redis
 *
 * public
 * hashset
 * key : [ns:appid:filemeta:detail]
 * vale : {
 *  totalSize: <buffer>,
 *  count: <buffer>,
 * }
 * **/
Keys.prototype.fileMetadataKey = function(applicationId) {
    return this.ns + ':' + applicationId +':filemeta:detail';
};

Keys.prototype.shardSetKey = function() {
    return this.ns + ':dbsize:sortedset';
};
/**
 * Redis
 * 
 * public
 * set
 * key : [ns:appid:market:location:set]
 * **/
Keys.prototype.marketCommentIdKey = function(applicationId, market, location) {
  return this.ns + ':' + applicationId + ':' + market + ':' + location + ':set';
};


/**
* Redis Config
* public
* Hash
* key : [ type, value ]
* **/
Keys.prototype.configKey = function(applicationId) {
    return this.ns+':config:'+applicationId;
};

/**
* Redis Users
* public
* Hash
* username : password
* **/

Keys.prototype.usernameKey = function(applicationId) {
    return this.ns+':username:'+applicationId+':detail';
};


/**
 * Redis Users
 *
 * public
 * Set
 * username
 * **/
Keys.prototype.usernameSetKey = function(applicationId) {
    return this.ns+':username:'+ applicationId + ':set';
};

/**
 * Redis Users
 *
 * public
 * Sorted Set
 * crawlingTime jobId
 * **/
Keys.prototype.crawlingTimeZsetKey = function(applicationId) {
    return this.ns+':crawlingTime:'+ applicationId + ':zset';
};

/**
* Redis Installation
*
* Hash
* deviceToken: _id
*
* TODO 이름 변경해야함
*
* **/
Keys.prototype.installationKey = function(applicationId) {
    return this.ns+':Installation:deviceToken:'+applicationId+':detail';
};


/**
* MongoDB
* **/
Keys.prototype.collectionKey = function( className, applicationId ) {
    return this.ns+':'+className+':'+applicationId;
};


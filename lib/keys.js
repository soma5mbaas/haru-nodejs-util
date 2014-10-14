

module.exports = new Keys('ns');

function Keys(ns) {
	this.ns = ns || 'ns';
};

Keys.prototype.setNameSapce = function( ns ) {
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

Keys.prototype.collectionKey = function( className, applicationId ) {
	return this.ns+':'+className+':'+applicationId;
};

Keys.prototype.tokenIdKey = function(applicationId, token) {
    return this.ns+':'+token+':'+applicationId;
};

Keys.prototype.idTokenKey = function(applicationId, _id) {
    return this.ns+':'+_id+':'+applicationId;
};

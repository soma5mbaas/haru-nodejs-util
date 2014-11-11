exports.schema = {
    "_id": "string",
    "updatedAt": "date",
    "createdAt": "date",
    "ACL": "ACL",

    "deviceType": "string",
    "pushType": "string",

    "deviceToken": "string",
    "timeZone": "string",
    "appName": "string",

    "appVersion": "string",

    "channels": "array",

    "userId": "string",

    "androidVersion": "string",
    "haruVersion": "string",
    "appIdentifier": "string"
};

exports.className = 'Installations';
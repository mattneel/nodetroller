var customerId = process.env.CUSTOMER_ID || "";
var serverHost = process.env.SERVER_HOST || "localhost";
var reportPeriod = (process.env.REPORT_PERIOD || 30) * 1000;
var registerPort = process.env.REGISTER_PORT || 4663;
var reportPort = process.env.REPORT_PORT || 4664;

var dataBuffer = [];

var reportServer = require('./lib/reportServer.js');
var registerServer = require('./lib/registerServer.js');

registerServer.create(registerPort);
reportServer.create(reportPort);
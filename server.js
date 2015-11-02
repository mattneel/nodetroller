var customerId = process.env.CUSTOMER_ID || "";
var serverHost = process.env.SERVER_HOST || "localhost";
var reportPeriod = (process.env.REPORT_PERIOD || 3) * 1000;
var registerPort = process.env.REGISTER_PORT || 4663;
var reportPort = process.env.REPORT_PORT || 4664;

var reportServer = require('./lib/reportServer.js');
var registerServer = require('./lib/registerServer.js');
var authenticator = require('./lib/httpAuthenticator.js');
var reporter = require('./lib/httpReporter.js');

authenticator.auth(serverHost, 80, customerId);
reporter.report(serverHost, 80, customerId, reportPeriod);

var regserv = registerServer.create(registerPort);
var repserv = reportServer.create(reportPort);

var http = require("http");
var uuid = require("uuid");
var reporter = require("../lib/httpReporter.js");
var sensorData = require("../lib/sensorData.js");

exports.httpReporterTests = {
    
    reported: false,

    setUp: function (callback) {
        var sensorA = uuid.v4().toString();
        var sensorB = uuid.v4().toString();
        sensorData.add(sensorB, { format: "int", length: 32, data: [] });
        sensorData.add(sensorA, { format: "float", length: 64, data: [] });
        sensorData.update(sensorB, 23);
        sensorData.update(sensorB, 24);
        sensorData.update(sensorB, 23);
        sensorData.update(sensorB, 26);
        sensorData.update(sensorB, 21);
        sensorData.update(sensorA, 0.145);
        sensorData.update(sensorA, 0.123);
        sensorData.update(sensorA, 0.113);
        http.createServer(function (request, response) {
            var body = {};
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                exports.httpReporterTests.reported = true;
            });
            response.end();
        }).listen(4321);
        callback();
    },
    
    authTest: function (test) {
        reporter.report("127.0.0.1", 4321, uuid.v4().toString(), 3000);
        setTimeout(function () {
            test.expect(1);
            test.ok(exports.httpReporterTests.reported, "Proper values reported");
            test.done();
        }, 5000);
        
    }
};
var dgram = require("dgram");
var uuid = require("uuid");
var reportServer = require("../lib/reportServer.js");

exports.reportServerTests = {
    
    setUp: function (callback) {
        reportServer.create(12345);
        callback();
    },
    
    tearDown: function (callback) {
        reportServer.destroy();
        callback();
    },
    connectAndSend: function (test) {
        var client = dgram.createSocket('udp4');
        var message = new Buffer(uuid.v4() + 32);
        client.send(message, 0, message.length, 12345, "127.0.0.1", function (err, bytes) {
            if (err) { throw err; }
            test.expect(1);
            test.ok(bytes, "UDP message sent.");
            test.done();
            client.close();
        });
    },
};
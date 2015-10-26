var net = require("net");
var uuid = require("uuid");
var registerServer = require("../lib/registerServer.js");

exports.registerServerTests = {
    
    setUp: function(callback)
    {
        registerServer.create(1234);
        callback();
    },
    
    tearDown: function(callback)
    {
        registerServer.destroy();
        callback();
    },
    connectAndSend: function (test)
    {
        var client = new net.Socket();
        client.connect(1234, "127.0.0.1", function () {
            client.write(" { \"uuid\": \""+uuid.v4()+ "\", \"format\": \"int\", \"length\": 32 }\n");
        });

        client.on('data', function (data) {
            test.expect(1);
            test.ok((data.toString() === "0"), "Register server working correctly.");
            test.done();
        });

    },
};
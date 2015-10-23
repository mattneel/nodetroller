var net = require("net");
var registerServer = require("../lib/registerServer.js");


exports.registerServerConnectionTest = function (test) {
    var server = registerServer.create(1234);
    var client = net.connect(1234, "127.0.0.1", function () {
        test.expect(1);
        test.ok(true, "Register client successfully connected.");
        test.done();
    });

}
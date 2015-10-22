var dgram = require("dgram");
var reportServer = {};

reportServer.create = function (listenPort) {
    this.server = dgram.createSocket('udp4');
    this.server.bind(listenPort);
    
    this.server.on('listening', function () {
        console.log("Report server listening on " + listenPort);
    });
    
    this.server.on('message', function (msg) {
        console.log("Report: " + msg.toString());
    });
    
    this.server.on('error', function (e) {
        console.log("Report error: " + e.toString());
    });
};

module.exports = reportServer;
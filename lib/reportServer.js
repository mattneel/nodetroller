var dgram = require("dgram");
var reportServer = {};

reportServer.create = function (listenPort) {
    this.server = dgram.createSocket('udp4');
    this.server.bind(listenPort);
    
    this.server.on('listening', function () {
        console.log("[REPORT] Server listening on " + listenPort);
    });
    
    this.server.on('message', function (msg) {
        console.log("[REPORT] " + msg.toString());
    });
    
    this.server.on('error', function (e) {
        console.log("[REPORT] Error: " + e.toString());
    });
};

module.exports = reportServer;
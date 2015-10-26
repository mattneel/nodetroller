var dgram = require("dgram");
var reportServer = {};

reportServer.create = function (listenPort, sensors) {
    this.data = sensors;
    this.server = dgram.createSocket('udp4');
    this.server.bind(listenPort);
    
    this.server.on('listening', function () {
        console.log("[REPORT] Server listening on " + listenPort);
    });
    
    this.server.on('message', function (msg) {
        var uuid = msg.slice(0, 36);
        var data = msg.slice(36, msg.length);
        if (uuid && data) {
            console.log("[REPORT] Recieved report from " + uuid + ": " + data);
        }
    });
    
    this.server.on('error', function (e) {
        console.log("[REPORT] Error: " + e.toString());
    });
};

reportServer.destroy = function () {
    this.server.close();
};

module.exports = reportServer;
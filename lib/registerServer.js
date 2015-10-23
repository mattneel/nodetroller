var net = require("net");

var registerServer = {};
/*
 * Register packet is just JSON. Format:
 * {
 *  "uuid": "UUID-STRING",
 *  "format": "int"/"float",
 *  "length": 32/64
 * }
 * */

registerServer.create = function (listenPort) {
    this.server = net.createServer(function (socket) {
        console.log("Register: Client connected.");
        socket.on('end', function () {
            console.log("Register: Client disconnected.");
        });
        
        socket.on('read', function (e) {
            var inString = e.data.text;
            var outArray = null;
            inString = inString.substr(0, inString.length - 1);
            try {
                outArray = JSON.parse(inString);
            } catch (e) {
                console.log("Register: Error in packet: " + e);
            }

            if (outArray) { console.log(outArray); }
        });
    });
    this.server.listen(listenPort, function () {
        console.log("Register server listening on " + listenPort);
    });
};

module.exports = registerServer;
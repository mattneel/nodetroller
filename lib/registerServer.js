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
        console.log("[REGISTER] Client connected.");
        socket.on('end', function () {
            console.log("[REGISTER] Client disconnected.");
        });
        
        socket.on('data', function (e) {
            var inString = e.toString();
            var outArray = null;
            inString = inString.substr(0, inString.length - 1);
            try {
                outArray = JSON.parse(inString);
            } catch (e) {
                console.log("[REGISTER] Packet error: " + e);
            }

            if (outArray) {
                console.log("[REGISTER] UUID: " + outArray.uuid + " registered!");
                socket.write("0");
            }
            else {
                socket.write("1");
            }
            socket.destroy();
        });
        socket.on('error', function (e) {
            console.log("[REGISTER] " + e.toString());
        });
    });
    this.server.listen(listenPort, function () {
        console.log("[REGISTER] Server listening on " + listenPort);
    });
};

registerServer.destroy = function () {
    this.server.close();
};

module.exports = registerServer;
var sensorData = require('./sensorData.js');
var authenticator = require('./httpAuthenticator.js');
var request = require("request");
var httpReporter = {};

httpReporter.report = function (server, port, id, timeout) {
    setInterval(function () {
        if (!authenticator.authed) {
            authenticator.auth(server, port, id);
        }
        
        if (sensorData.data) {
            request({
                url: 'http://' + server + ':' + port + '/report',
                method: 'POST',
                json: sensorData.data,
                headers: {
                    'Token': authenticator.token
                }
            }, function (err, resp) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (resp.statusCode === 204) {
                    return;
                }
                else if (resp.statusCode === 403) {
                    authenticator.auth(server, port, id);
                }
                else if (resp.statusCode[0] === 5) {
                    this.report(server, port, id, timeout);
                }
            });
        }
        
    }, timeout);

};

module.exports = httpReporter;

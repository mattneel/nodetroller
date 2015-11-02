var request = require("request");
var httpAuthenticator = {};

httpAuthenticator.token = "";
httpAuthenticator.authed = false;

httpAuthenticator.auth = function (server, port, id) {
    request({
        url: 'http://' + server + ':' + port + '/auth',
        method: 'POST',
        json: {
            customer_id: id
        }
    }, function (err, resp, body) {
        if (err) {
            console.log(err);
            return;
        }
        if (resp.statusCode === 201) {
            this.token = body.token;
            this.authed = true;
        }
        if (resp.statusCode[0] === 4 || resp.statusCode[0] === 5) {
            this.auth(server, port, id);
        }
    });
};

module.exports = httpAuthenticator;
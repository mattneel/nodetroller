var http = require("http");
var uuid = require("uuid");
var authenticator = require("../lib/httpAuthenticator.js");

exports.httpAuthenticatorTests = {

    setUp: function (callback) {
        http.createServer(function (request, response) {
                response.writeHead(201);
                response.end(JSON.stringify({token: uuid.v4().toString()}));
            
        }).listen(54321);
        callback();
    },

    authTest: function (test) {
        authenticator.auth("127.0.0.1", 54321, uuid.v4().toString());
        setTimeout(function () {
            test.expect(2);
            test.ok(authenticator.token, "Token good.");
            test.ok(authenticator.authed, "Sucessfully authorized.");
            test.done();
        }, 3000);
        
    }
};
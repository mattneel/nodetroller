var uuid = require("uuid");
var sensorData = require("../lib/sensorData.js");
var sampleUuid = uuid.v4().toString();
var sampleData = 43892;

exports.sensorDataTests = {

    setUp: function (callback){
        callback();
    },

    tearDown: function (callback){
        callback();
    },

    addAndCheck: function (test)
    {
        sensorData.add(sampleUuid, { format: "int", length: 32, data: [] });
        sensorData.update(sampleUuid, sampleData);
        test.expect(1);
        var data = sensorData.get(sampleUuid);
        test.ok(data.data[0].data === sampleData, "sensorData working.");
        test.done();

    }
};
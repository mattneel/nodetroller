var persist = require("node-persist");

var sensorData = {};

sensorData.data = [];

sensorData.create = function () {

    persist.initSync();

};

sensorData.push = function (uuid, data) {
    persist.setItemSync(uuid, data);
};

sensorData.get = function (uuid) {
    return persist.getItemSync(uuid);
};

module.exports = sensorData;
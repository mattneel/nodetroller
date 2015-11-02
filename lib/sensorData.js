

var sensorData = {};

sensorData.data = [];

/*  Controller object format:
 * {
 *  format: "int"/"float",
 *  length: 32/64,
 *  data: [ {time: "UTC Time", value: 9234980 } ]
 *  }
 */  

sensorData.add = function (uuid, data) {
    this.data[uuid] = data;
};

sensorData.get = function (uuid) {
    return this.data[uuid];
};

sensorData.update = function (uuid, data) {
    if (this.data[uuid]) {
        this.data[uuid].data.push({ time: new Date().getTime.toString(), data: data });
    }

};

module.exports = sensorData;
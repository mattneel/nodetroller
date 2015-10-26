var sensorData = {};

sensorData.data = [];

sensorData.add = function (uuid, reading) {
    this.data.push({
        "uuid": uuid,
        "reading": reading
    });
};

module.exports = sensorData;
var appControllers = angular.module("appControllers", []);

appControllers.controller("SensorController", ["$http", function ($http) {
    var _this = this;
    _this.location = "";
    _this.downloadData = "";

    var lightData = [];
    var timeData = [];
    var temperatureData = [];
    var humidityData = [];
    var movementData = [];
    var co2Data = [];

    _this.downloadData = function() {

        var url = "api/sensor/getallsensordata";
        $http
            .get(url)
            .then(
                function(response) {
                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data));
                    _this.downloadData = data;
                    var a = document.createElement("a");
                    a.href = "data: " + _this.downloadData;
                    a.download = 'SensorData.json';
                    a.innerHTML = 'SensorData.json';

                    var container = $("#downloadContainer");
                    container.append(a);
                },
                function(response) {
                    console.log("FAIL");
                }
            );

    }

    _this.getSensorData = function () {

        var url = "api/sensor/getlatestsensordata";
        $http
            .get(url)
            .then(
                function(response) {

                    _this.data = response.data;

                    for (var i = 0; i < _this.data.length; i++) {
                        var date = _this.data[i].timecreated;
                        $.format.toBrowserTimeZone(date);
                        var dateFormat = $.format.date(date, "dd.MMM HH:mm");
                        _this.location = _this.data[i].location;
                        lightData.push(_this.data[i].light);
                        temperatureData.push(_this.data[i].temperature);
                        humidityData.push(_this.data[i].humidity);

                        if (_this.data[i].motion === "true") {
                            movementData.push("1");
                        } else {
                            movementData.push("0");
                        }
                        console.log("formating date: " + date);
                        timeData.push(dateFormat);
                        co2Data.push(_this.data[i].carbondioxide);
                    }


                    lightSensorChart(lightData, timeData);
                    dhtChart(temperatureData, humidityData, timeData);
                    pirChart(movementData, timeData);
                    coChart(co2Data, timeData);


                },
                function(response) {
                    console.log("FAIL");
                }
            );

    }();
}]);//End of AppController
appControllers.controller("MainController", ["$http", function($http) {

    }
]);



/* DRAW CHART */
var pirChart = function (movement, time) {
    var ctx = $("#pirChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time,
            datasets: [
                {
                    label: "Movement",
                    data: movement,
                    backgroundColor: '#34495e'
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
        }
    });
}

var coChart = function (co2Data, time) {
    var ctx = $("#coChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [
                {
                    label: "CO2",
                    data: co2Data,
                    borderColor: 'rgba(255,99,132,1)'
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}

var dhtChart = function (temperatureData, humidityData, time) {
    var ctx = $("#dhtChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [
                {
                    label: "Temperature",
                    data: temperatureData,
                    borderColor: 'rgba(255,99,132,1)'
                },
                {
                    label: "Humidity",
                    data: humidityData,
                    backgroundColor: "rgba(153,255,51,0.6)"
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}

var lightSensorChart = function (lightData, time) {
    var ctx = $("#lightChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time,
            datasets: [
            {
                label: "Light sensor",
                data: lightData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',


                borderWidth: 1
            }
            ]
        },
        options: {

            scales: {
                yAxes: [
                {
                    ticks: {
                        min: 500
                    }
                }]
            },
        }
    });
}
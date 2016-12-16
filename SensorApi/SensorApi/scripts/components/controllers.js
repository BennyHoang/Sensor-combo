var appControllers = angular.module("appControllers", []);

appControllers.controller("MainController", ["$http", function ($http) {
    var _this = this;
    _this.data;
    _this.getSensorData = function () {

        var url = "api/sensor/getlatestsensordata";
        $http
            .get(url)
            .then(
                function (response) {
                    
                        _this.data = response.data;
                        var lightData = [];
                        var timeData = [];
                        var temperatureData = [];
                        var humidityData = [];
                        var movementData = [];
                        for (var i = 0; i < _this.data.length; i++) {

                            var d = new Date(_this.data[i].timecreated);
                            var hours = d.getHours();
                            var minutes = d.getMinutes();
                            var seconds = d.getSeconds();

                            lightData.push(_this.data[i].light);
                            temperatureData.push(_this.data[i].temperature);
                            humidityData.push(_this.data[i].humidity);

                            if (_this.data[i].motion === "true") {
                                movementData.push("1");
                            } else {
                                movementData.push("0");
                            }

                            timeData.push(hours + ":" + minutes + ":" + seconds);
                            console.log(hours + ":" + minutes + ":" + seconds);
                            console.log(movementData[i]);
                        }
                        lightSensorChart(lightData, timeData);
                        dhtChart(temperatureData, humidityData, timeData);
                        
                        pirChart(movementData, timeData);
                    

                },
                function (response) {
                    console.log("FAIL");
                }
            )
     
    }();
}]);//End of AppController

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
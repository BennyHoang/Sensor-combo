var appControllers = angular.module("appControllers", []);

appControllers.controller("AddRoomController", [
    "$http", function ($http) {
        _this = this;
        _this.id = "";
        _this.device = "";
        _this.floor = "";
        _this.description = "";
        _this.name = "";

        _this.listDevices = [];
        _this.addRoom = function () {
            var addRoomUrl = "api/campus/postroom";
            $http
                .post(
                    addRoomUrl,
                    JSON.stringify(
                        {
                            id: _this.id,
                            device: _this.device,
                            floor: _this.floor,
                            description: _this.description,
                            name: _this.name
                        }
                    ),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                )
                .then(
                    function (response) {
                        alert("room is added");
                    },
                    function (response) {
                        console.log(response);
                    }
                );
        }
        _this.getSensorData = function () {

            var url = "api/sensor/getallsensordata";
            $http
                .get(url)
                .then(
                    function (response) {
                        _this.data = response.data;


                        $.each(_this.data, function (k, v) {
                            if ($.inArray(v.guid, _this.listDevices) == -1) {
                                _this.listDevices.push(v.guid);
                            }

                        });
                        console.log(_this.listDevices);

                    },
                    function (response) {
                        console.log("FAIL");
                    }
                );

        }();
    }
]);
appControllers.controller("MainController", ["$http", function ($http) {
    _this = this;

    var getRooms = function () {
        var url = "api/campus/getallrooms";

        $http
            .get(url)
            .then(
                function (response) {
                    _this.data = response.data;
                },
                function (response) {
                    console.log(response);
                }
            );
    }();

}]);
appControllers.controller("RoomController", ["$http", "$routeParams", "$location", function ($http, $routeParams, $location) {
    var _this = this;
    _this.id = $routeParams.id;
    var filteredData = [];
    var lightData = [];
    var timeData = [];
    var temperatureData = [];
    var humidityData = [];
    var movementData = [];
    var co2Data = [];
    var accessToken = "d7c0d4dead06c0bc6f45e03ea5f9000f24ccda9b";


    _this.updateParticle = function() {
        var deviceID = "1e0041000c47343432313031";
        var setFunc = "setLoc";
        //https://api.particle.io/v1/devices/1e0041000c47343432313031/setLoc?access_token=d7c0d4dead06c0bc6f45e03ea5f9000f24ccda9b
        //Doc: https://community.particle.io/t/tutorial-spark-variable-and-function-on-one-web-page/4181
        var requestURL = "https://api.particle.io/v1/devices/" + deviceID + "/" + setFunc;
        $.post(requestURL, { params: _this.name, access_token: accessToken });

    };
    _this.getRoom = function () {
        var url = "api/campus/getroombyid/" + _this.id;
        $http
            .get(
                url,
                {
                    params: {
                        id: _this.id
                    }
                }
            )
            .then(
                function (response) {
                    var id = response.data.room.id;
                    var device = response.data.room.device;
                    var floor = response.data.room.floor;
                    var description = response.data.room.description;
                    var date = response.data.room.datecreated;
                    var name = response.data.room.name;

                    _this.id = id;
                    _this.device = device;
                    _this.floor = floor;
                    _this.description = description;
                    _this.date = date;
                    _this.name = name;
                },
                function (response) {
                    console.log("not working man", response);
                }
            )
    }();
    _this.putRoom = function () {
        var url = "api/campus/putroom";
        $http
            .put(
                url,
                JSON.stringify(
                    {
                        id: _this.id,
                        name: _this.name,
                        device: _this.device,
                        floor: _this.floor,
                        description: _this.description
                    }
                ),
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            .then(
                function (response) {
                    alert("Article Updated");
                },
                function (response) {
                    alert("something went wrong");
                }
            );
    };
    _this.deleteRoom = function () {
        var url = "api/campus/deleteroom";

        $http
            .delete(
                url,
                {
                    params: {
                        id: _this.id
                    }
                }
            )
            .then(
                function (response) {
                    alert("deleted");
                    $location.Path("/main");

                },
                function (response) {
                    alert("something went wrong");
                }
            );
    };
    _this.downloadData = function () {

        var url = "api/sensor/getallsensordata";
        $http
            .get(url)
            .then(
                function (response) {


                    var filter = $.grep(response.data, function(n, i) {
                        return n.guid === _this.device;
                    });
                    filteredData.push(filter);

                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filter));
                    _this.downloadData = data;
                    var a = document.createElement("a");
                    a.href = "data: " + _this.downloadData;
                    a.download = 'SensorData.json';
                    a.innerHTML = 'SensorData.json';

                    var container = $("#downloadContainer");
                    container.append(a);
                },
                function (response) {
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

                        var filter = $.grep(response.data, function(n, i) {
                            return n.guid === _this.device;
                        });
                        filteredData.push(filter);

                        _this.data = filter;
                        console.log(_this.data);

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
}]);



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
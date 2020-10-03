var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=",
    queryUrlUv = "http://api.openweathermap.org/data/2.5/uvi?",
    apiKey = "&appid=6cc8bbd0f9c3b88ec510c02440bb3c5a",
    m = moment().format("(MM/DD/YYYY)"),
    mObj = moment(m, "(MM/DD/YYYY)");

// on click search button
$("#search").click(function() {
    event.preventDefault();
    var searchTerm = $("input").val();
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-light">' + searchTerm + '</button>');
    localStorage.setItem("searchTerm", searchTerm);
    $.ajax({
        type: "get",
        url: queryUrl + searchTerm + apiKey,
        success: function(response) {
            var todayTempF = (response.list[0].main.temp - 273.15) * 1.80 + 32,
                lat = response.city.coord.lat,
                lon = response.city.coord.lon;
            $("#todaysForecast").empty();
            $("#todaysForecast").append('<li><h2>' + response.city.name + ' ' + m + '<img src="./assets/icons/' + response.list[0].weather[0].icon + '.png"></h2></li>');
            $("#todaysForecast").append('<li>Temperature: ' + todayTempF.toFixed(2) + ' °F</li>');
            $("#todaysForecast").append('<li>Humidity: ' + response.list[0].main.humidity + '%</li>');
            $("#todaysForecast").append('<li>Wind Speed: ' + response.list[0].wind.speed + ' MPH</li>');
            $.ajax({
                type: "get",
                url: queryUrlUv + "lat=" + lat + "&lon=" + lon + apiKey,
                success: function(response) {
                    $("#todaysForecast").append('<li>UV Index: <button id="uvIndexSeverity" type="button">' + response.value + '</button></li>');
                    if (response.value < 4) {
                        $("#uvIndexSeverity").addClass("btn btn-success");
                    }
                    if (response.value > 4) {
                        $("#uvIndexSeverity").addClass("btn btn-warning");
                    }
                    if (response.value > 7) {
                        $("#uvIndexSeverity").addClass("btn btn-danger");
                    }
                }
            });
            $("#fiveDay").empty();
            for (let i = 1; i < 6; i++) {
                var tempF = (response.list[i * 8 - 1].main.temp - 273.15) * 1.80 + 32,
                    date = mObj.add(1, "days").format("MM/DD/YYYY");
                $("#fiveDay").append('<div class="dayCard" id="dayCard' + i + '"></div>');
                $("#dayCard" + i).append('<ul id="dayCardList' + i + '"></ul>');
                $("#dayCardList" + i).append('<li class="fiveDayDate">' + date + '</li>')
                $("#dayCardList" + i).append('<li><img src="./assets/icons/' + response.list[i * 8 - 1].weather[0].icon + '.png"></li>')
                $("#dayCardList" + i).append('<li>Temp: ' + tempF.toFixed(0) + ' °F</li>')
                $("#dayCardList" + i).append('<li>Humidity: ' + response.list[i * 8 - 1].main.humidity + '%</li>')
            }
        }
    });
});

// on click previous search buttons
$(document).on('click', "#cityButton", function() {
    event.preventDefault();
    var searchTerm = $(this).text();
    $.ajax({
        type: "get",
        url: queryUrl + searchTerm + apiKey,
        success: function(response) {
            var todayTempF = (response.list[0].main.temp - 273.15) * 1.80 + 32,
                lat = response.city.coord.lat,
                lon = response.city.coord.lon;
            $("#todaysForecast").empty();
            $("#todaysForecast").append('<li><h2>' + response.city.name + ' ' + m + '<img src="./assets/icons/' + response.list[0].weather[0].icon + '.png"></h2></li>');
            $("#todaysForecast").append('<li>Temperature: ' + todayTempF.toFixed(2) + ' °F</li>');
            $("#todaysForecast").append('<li>Humidity: ' + response.list[0].main.humidity + '%</li>');
            $("#todaysForecast").append('<li>Wind Speed: ' + response.list[0].wind.speed + ' MPH</li>');
            $.ajax({
                type: "get",
                url: queryUrlUv + "lat=" + lat + "&lon=" + lon + apiKey,
                success: function(response) {
                    $("#todaysForecast").append('<li>UV Index: <button id="uvIndexSeverity" type="button">' + response.value + '</button></li>');
                    if (response.value < 4) {
                        $("#uvIndexSeverity").addClass("btn btn-success");
                    }
                    if (response.value > 4) {
                        $("#uvIndexSeverity").addClass("btn btn-warning");
                    }
                    if (response.value > 7) {
                        $("#uvIndexSeverity").addClass("btn btn-danger");
                    }
                }
            });
            $("#fiveDay").empty();
            for (let i = 1; i < 6; i++) {
                var tempF = (response.list[i * 8 - 1].main.temp - 273.15) * 1.80 + 32,
                    date = mObj.add(1, "days").format("MM/DD/YYYY");
                $("#fiveDay").append('<div class="dayCard" id="dayCard' + i + '"></div>');
                $("#dayCard" + i).append('<ul id="dayCardList' + i + '"></ul>');
                $("#dayCardList" + i).append('<li class="fiveDayDate">' + date + '</li>')
                $("#dayCardList" + i).append('<li><img src="./assets/icons/' + response.list[i * 8 - 1].weather[0].icon + '.png"></li>')
                $("#dayCardList" + i).append('<li>Temp: ' + tempF.toFixed(0) + ' °F</li>')
                $("#dayCardList" + i).append('<li>Humidity: ' + response.list[i * 8 - 1].main.humidity + '%</li>')
            }
        }
    });
});

// onload populate last search
window.onload = function() {
    event.preventDefault();
    var searchTerm = localStorage.getItem("searchTerm");
    $.ajax({
        type: "get",
        url: queryUrl + searchTerm + apiKey,
        success: function(response) {
            var todayTempF = (response.list[0].main.temp - 273.15) * 1.80 + 32,
                lat = response.city.coord.lat,
                lon = response.city.coord.lon;
            $("#todaysForecast").empty();
            $("#todaysForecast").append('<li><h2>' + response.city.name + ' ' + m + '<img src="./assets/icons/' + response.list[0].weather[0].icon + '.png"></h2></li>');
            $("#todaysForecast").append('<li>Temperature: ' + todayTempF.toFixed(2) + ' °F</li>');
            $("#todaysForecast").append('<li>Humidity: ' + response.list[0].main.humidity + '%</li>');
            $("#todaysForecast").append('<li>Wind Speed: ' + response.list[0].wind.speed + ' MPH</li>');
            $.ajax({
                type: "get",
                url: queryUrlUv + "lat=" + lat + "&lon=" + lon + apiKey,
                success: function(response) {
                    $("#todaysForecast").append('<li>UV Index: <button id="uvIndexSeverity" type="button">' + response.value + '</button></li>');
                    if (response.value < 4) {
                        $("#uvIndexSeverity").addClass("btn btn-success");
                    }
                    if (response.value > 4) {
                        $("#uvIndexSeverity").addClass("btn btn-warning");
                    }
                    if (response.value > 7) {
                        $("#uvIndexSeverity").addClass("btn btn-danger");
                    }
                }
            });
            $("#fiveDay").empty();
            for (let i = 1; i < 6; i++) {
                var tempF = (response.list[i * 8 - 1].main.temp - 273.15) * 1.80 + 32,
                    date = mObj.add(1, "days").format("MM/DD/YYYY");
                $("#fiveDay").append('<div class="dayCard" id="dayCard' + i + '"></div>');
                $("#dayCard" + i).append('<ul id="dayCardList' + i + '"></ul>');
                $("#dayCardList" + i).append('<li class="fiveDayDate">' + date + '</li>')
                $("#dayCardList" + i).append('<li><img src="./assets/icons/' + response.list[i * 8 - 1].weather[0].icon + '.png"></li>')
                $("#dayCardList" + i).append('<li>Temp: ' + tempF.toFixed(0) + ' °F</li>')
                $("#dayCardList" + i).append('<li>Humidity: ' + response.list[i * 8 - 1].main.humidity + '%</li>')
            }
        }
    });
};
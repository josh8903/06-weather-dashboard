var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=",
    queryUrlUv = "http://api.openweathermap.org/data/2.5/uvi?",
    apiKey = "&appid=6cc8bbd0f9c3b88ec510c02440bb3c5a",
    date = moment().format("(MM/DD/YYYY)");

// on click search button
$("#search").click(function() {
    event.preventDefault();
    var searchTerm = $("input").val()
    localStorage.setItem("searchTerm", searchTerm);
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-outline-dark">' + searchTerm + '</button>');
    $.ajax({
        type: "get",
        url: queryUrl + searchTerm + apiKey,
        success: function(response) {
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32,
                lat = response.city.coord.lat,
                lon = response.city.coord.lon;
            $("#todaysForecast").append('<li>' + response.city.name + ' ' + date + '</li>');
            $("#todaysForecast").append('<li>Temperature: ' + tempF.toFixed(2) + ' °F</li>');
            $("#todaysForecast").append('<li>Humidity: ' + response.list[0].main.humidity + '%</li>');
            $("#todaysForecast").append('<li>Wind Speed: ' + response.list[0].wind.speed + ' MPH</li>');
            $.ajax({
                type: "get",
                url: queryUrlUv + "lat=" + lat + "&lon=" + lon + apiKey,
                success: function(response) {
                    $("#todaysForecast").append('<li>UV Index: ' + response.value + '</li>');
                }
            });
        }
    });
});

// load last city on page load
$(document).ready(function() {
    var searchTerm = localStorage.getItem("searchTerm");
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-outline-dark">' + searchTerm + '</button>');
});
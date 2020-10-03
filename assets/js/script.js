var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=",
    queryUrlUv = "https://api.openweathermap.org/data/2.5/uvi?",
    apiKey = "&appid=6cc8bbd0f9c3b88ec510c02440bb3c5a",
    m = moment().format("(MM/DD/YYYY)");

// on click search button
// save search term to local storage
// run search by text entry
$("#search").click(function() {
    event.preventDefault()
    var searchTerm = $("input").val();
    localStorage.setItem("searchTerm", searchTerm);
    $("input").val('');
    $("#cities").prepend(`
    <button id="cityButton" type="button" class="btn btn-light">${searchTerm}</button>
    `);
    run(searchTerm);
});

// on click previous search buttons
// run search by button text
$(document).on('click', "#cityButton", function() {
    var searchTerm = $(this).text();
    run(searchTerm);
});

// on window load run search by most revent search term
window.onload = function() {
    var searchTerm = localStorage.getItem("searchTerm");
    run(searchTerm);
};

function run(searchTerm) {
    // main weather ajax
    // append todays forecast data to #todaysForecast div
    $.ajax({
        type: "get",
        url: queryUrl + searchTerm + apiKey,
        success: function(response) {
            var todayTempF = (response.list[0].main.temp - 273.15) * 1.80 + 32,
                lat = response.city.coord.lat,
                lon = response.city.coord.lon;
            $("#todaysForecast").empty();
            $("#todaysForecast").append(`
                <li><h2>${response.city.name} ${m}<img src="./assets/icons/${response.list[0].weather[0].icon}.png"></h2></li>
                <li>Temperature: ${todayTempF.toFixed(2)} °F</li>
                <li>Humidity: ${response.list[0].main.humidity}%</li>
                <li>Wind Speed: ${response.list[0].wind.speed} MPH</li>
            `);
            // uv index ajax, uses lat&lon values from main weather ajax
            // append uv data to #todaysForecast div
            $.ajax({
                type: "get",
                url: queryUrlUv + "lat=" + lat + "&lon=" + lon + apiKey,
                success: function(response) {
                    $("#todaysForecast").append(`
                        <li>UV Index: <button id="uvIndexSeverity" type="button">${response.value}</button></li>
                    `);
                    // colorize uv index data by severity -- bootstrap buttons
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
            // append five day weather cards to #fiveDay div
            $("#fiveDay").empty();
            for (let i = 1; i < 6; i++) {
                var tempF = (response.list[i * 8 - 1].main.temp - 273.15) * 1.80 + 32,
                    mObj = moment(m, "(MM/DD/YYYY)"),
                    date = mObj.add(i, "days").format("MM/DD/YYYY");
                $("#fiveDay").append(`
                    <div class="dayCard" id="dayCard${i}"></div>
                `);
                $("#dayCard" + i).append(`
                    <ul id="dayCardList${i}"></ul>
                `);
                $("#dayCardList" + i).append(`
                    <li class="fiveDayDate">${date}</li>
                    <li><img src="./assets/icons/${response.list[i * 8 - 1].weather[0].icon}.png"></li>
                    <li>Temp: ${tempF.toFixed(0)} °F</li>
                    <li>Humidity: ${response.list[i * 8 - 1].main.humidity}%</li>
                `);
            }
        }
    });
}
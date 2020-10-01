var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=",
    apiKey = "&appid=6cc8bbd0f9c3b88ec510c02440bb3c5a";



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
            console.log(response);
        }
    });
});

// load last city on page load
$(document).ready(function() {
    var searchTerm = localStorage.getItem("searchTerm");
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-outline-dark">' + searchTerm + '</button>');
});
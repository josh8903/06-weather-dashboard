// on click search button
$("#search").click(function() {
    event.preventDefault();
    var searchTerm = $("input").val()
    localStorage.setItem("searchTerm", searchTerm);
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-outline-dark">' + searchTerm + '</button>');
});

// load last city on page load
$(document).ready(function() {
    var searchTerm = localStorage.getItem("searchTerm");
    $("#cities").prepend('<button id="cityButton" type="button" class="btn btn-outline-dark">' + searchTerm + '</button>');
});
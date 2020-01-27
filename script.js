$(document).ready(function() {

// Search Button Event

$("#search-button").on("click", function () {

    // remove welcome message

    $("#your-weather").remove();

    // this will call weather API for user-input response

    let userInput = $("#user-input").val().trim();

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

            let currentDate = moment().format("M/DD/YYYY");

            $("#li1").text(response.name + " (" + currentDate + ")");
            $("#li2").text("Description: " + response.weather[0].description);
            $("#li3").text("Temperature: " + response.main.temp + " °F");
            $("#li4").text("Humidity: " + response.main.humidity + "%");
            $("#li5").text("Wind Speed: " + response.wind.speed + " mph");


        let lonVariable = response.coord.lon;
        let latVariable = response.coord.lat;

        const queryURL2 = `https://api.openweathermap.org/data/2.5/uvi?appid=e3dcee7ffae7d41114ef66eb6380a806&lat=${latVariable}&lon=${lonVariable}`;

        
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function (response2) {

            let indexValue = response2.value;
            let uvSpan = $("<span>");
            $("#li6").text("UV Index: ");
            uvSpan.text(indexValue);
            $("#li6").append(uvSpan);

            if (indexValue > 7) {
                $(uvSpan).css("background-color", "red");
            } else if (indexValue < 8 && indexValue > 3) {
                $(uvSpan).css("background-color", "gray");
            } else {
                $(uvSpan).css("background-color", "green");
            }

        });


        const queryURL3 = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).done(function (response3) {

            $("#small-container").removeClass("hide");

            $("#card-title-1").text(response3.list[3].dt_txt);
            $("#card-subtitle-1").text("Temperature: " + response3.list[3].main.temp + " °F");
            $("#card-p-1").text("Humidity: " + response3.list[3].main.humidity + "%");

            $("#card-title-2").text(response3.list[11].dt_txt);
            $("#card-subtitle-2").text("Temperature: " + response3.list[11].main.temp + " °F");
            $("#card-p-2").text("Humidity: " + response3.list[11].main.humidity + "%");

            $("#card-title-3").text(response3.list[19].dt_txt);
            $("#card-subtitle-3").text("Temperature: " + response3.list[19].main.temp + " °F");
            $("#card-p-3").text("Humidity: " + response3.list[19].main.humidity + "%");

            $("#card-title-4").text(response3.list[27].dt_txt);
            $("#card-subtitle-4").text("Temperature: " + response3.list[27].main.temp + " °F");
            $("#card-p-4").text("Humidity: " + response3.list[27].main.humidity + "%");

            $("#card-title-5").text(response3.list[35].dt_txt);
            $("#card-subtitle-5").text("Temperature: " + response3.list[35].main.temp + " °F");
            $("#card-p-5").text("Humidity: " + response3.list[35].main.humidity + "%");
            
        });

    });

    // this will add search item to "recent search" list

    let recentList = $("#ul-list");
    let newItem = $("<li>");
    newItem.text(userInput);
    newItem.addClass("list-group-item");
    recentList.prepend(newItem);

    // Resets search box value

    $("#user-input").val('');

} );


});
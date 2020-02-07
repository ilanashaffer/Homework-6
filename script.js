$(document).ready(function() {

let userInput = document.getElementById('user-input');
const ulList = document.getElementById('ul-list');
const searchButton = document.getElementById('search-button');

let recentSearches = [];

init();

function renderSearches() {

  ulList.innerHTML = "";

  for (let i = 0; i < recentSearches.length; i++) {
    let searchItem = recentSearches[i];
    let li = document.createElement("li");
    li.textContent = searchItem;
    li.setAttribute('data-index', i);
    $(li).addClass('recent-search-li');
    $(ulList).prepend(li);
  }
}

function init() {
    let storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  
    if (storedSearches !== null) {
      recentSearches = storedSearches;
    }

    renderSearches();
}

function storeSearches() {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    let inputText = userInput.value.trim();
  
    if (inputText === "") {
      return;
    }
  
    recentSearches.push(inputText);
    userInput.value = "";

    $("#your-weather").remove();
    $('#forecast').removeClass('hide');

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&APPID=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        let currentDate = moment().format("M/DD/YYYY");

        $("#current-city").text(response.name + " (" + currentDate + ")");
        $("#current-icon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#li1").text("Temperature: " + response.main.temp + " °F");
        $("#li2").text("Humidity: " + response.main.humidity + "%");
        $("#li3").text("Wind Speed: " + response.wind.speed + " mph");


        let lonVariable = response.coord.lon;
        let latVariable = response.coord.lat;

        const queryURL2 = `https://api.openweathermap.org/data/2.5/uvi?appid=e3dcee7ffae7d41114ef66eb6380a806&lat=${latVariable}&lon=${lonVariable}`;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function (response2) {

            let indexValue = response2.value;
            let uvSpan = $("<span>");
            $("#li4").text("UV Index: ");
            uvSpan.text(indexValue);
            $("#li4").append(uvSpan);

            if (indexValue > 7) {
                $(uvSpan).css("background-color", "red");
            } else if (indexValue < 8 && indexValue > 3) {
                $(uvSpan).css("background-color", "gray");
            } else {
                $(uvSpan).css("background-color", "green");
            }

        }); // second ajax function closing


        const queryURL3 = `https://api.openweathermap.org/data/2.5/forecast?q=${inputText}&appid=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).done(function (response3) {

            let tomorrowDate = moment().add(1, 'days').format("M/DD/YYYY");
            let secondDate = moment().add(2, 'days').format("M/DD/YYYY");
            let thirdDate = moment().add(3, 'days').format("M/DD/YYYY");
            let fourthDate = moment().add(4, 'days').format("M/DD/YYYY");
            let fifthDate = moment().add(5, 'days').format("M/DD/YYYY");

            $("#small-container").removeClass("hide");

            $("#card-title-1").html(tomorrowDate);
            $("#icon-1").attr("src", "http://openweathermap.org/img/w/" + response3.list[3].weather[0].icon + ".png");
            $("#card-subtitle-1").text("Temp: " + response3.list[3].main.temp_max + " °F");
            $("#card-p-1").text("Humidity: " + response3.list[3].main.humidity + "%");

            $("#card-title-2").text(secondDate);
            $("#icon-2").attr("src", "http://openweathermap.org/img/w/" + response3.list[11].weather[0].icon + ".png");
            $("#card-subtitle-2").text("Temp: " + response3.list[11].main.temp_max + " °F");
            $("#card-p-2").text("Humidity: " + response3.list[11].main.humidity + "%");

            $("#card-title-3").text(thirdDate);
            $("#icon-3").attr("src", "http://openweathermap.org/img/w/" + response3.list[19].weather[0].icon + ".png");
            $("#card-subtitle-3").text("Temp: " + response3.list[19].main.temp_max + " °F");
            $("#card-p-3").text("Humidity: " + response3.list[19].main.humidity + "%");

            $("#card-title-4").text(fourthDate);
            $("#icon-4").attr("src", "http://openweathermap.org/img/w/" + response3.list[27].weather[0].icon + ".png");
            $("#card-subtitle-4").text("Temp: " + response3.list[27].main.temp_max + " °F");
            $("#card-p-4").text("Humidity: " + response3.list[27].main.humidity + "%");

            $("#card-title-5").text(fifthDate);
            $("#icon-5").attr("src", "http://openweathermap.org/img/w/" + response3.list[35].weather[0].icon + ".png");
            $("#card-subtitle-5").text("Temp: " + response3.list[35].main.temp_max + " °F");
            $("#card-p-5").text("Humidity: " + response3.list[35].main.humidity + "%");
            
        }); // third ajax function closing

    }); // first ajax function closing
  
    // Re-render the list
    removeSearches();
    storeSearches();
    renderSearches();

}); // Search button closing

// Remove recent searches greater than 10

function removeSearches() {
    if (recentSearches.length > 10) {
        recentSearches.shift();
    } else {
        return;
    }
};


// if li search item clicked, prepend to list and call search function (to be made)

ulList.addEventListener("click", function(event) {
    let recentSearchValue = event.target.textContent;
    $(ulList).prepend(event.target);

    $("#your-weather").remove();
    $('#forecast').removeClass('hide');

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${recentSearchValue}&APPID=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        let currentDate = moment().format("M/DD/YYYY");

        $("#current-city").text(response.name + " (" + currentDate + ")");
        $("#current-icon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#li1").text("Temperature: " + response.main.temp + " °F");
        $("#li2").text("Humidity: " + response.main.humidity + "%");
        $("#li3").text("Wind Speed: " + response.wind.speed + " mph");


        let lonVariable2 = response.coord.lon;
        let latVariable2 = response.coord.lat;

        const queryURL2 = `https://api.openweathermap.org/data/2.5/uvi?appid=e3dcee7ffae7d41114ef66eb6380a806&lat=${latVariable2}&lon=${lonVariable2}`;

        
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function (response2) {

            let indexValue = response2.value;
            let uvSpan = $("<span>");
            $("#li4").text("UV Index: ");
            uvSpan.text(indexValue);
            $("#li4").append(uvSpan);

            if (indexValue > 7) {
                $(uvSpan).css("background-color", "red");
            } else if (indexValue < 8 && indexValue > 3) {
                $(uvSpan).css("background-color", "gray");
            } else {
                $(uvSpan).css("background-color", "green");
            }

        }); // second ajax function closing


        const queryURL3 = `https://api.openweathermap.org/data/2.5/forecast?q=${recentSearchValue}&appid=e3dcee7ffae7d41114ef66eb6380a806&units=imperial`;

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).done(function (response3) {

            let tomorrowDate2 = moment().add(1, 'days').format("M/DD/YYYY");
            let secondDate2 = moment().add(2, 'days').format("M/DD/YYYY");
            let thirdDate2 = moment().add(3, 'days').format("M/DD/YYYY");
            let fourthDate2 = moment().add(4, 'days').format("M/DD/YYYY");
            let fifthDate2 = moment().add(5, 'days').format("M/DD/YYYY");

            $("#small-container").removeClass("hide");

            $("#card-title-1").text(tomorrowDate2);
            $("#icon-1").attr("src", "http://openweathermap.org/img/w/" + response3.list[3].weather[0].icon + ".png");
            $("#card-subtitle-1").text("Temp: " + response3.list[3].main.temp_max + " °F");
            $("#card-p-1").text("Humidity: " + response3.list[3].main.humidity + "%");

            $("#card-title-2").text(secondDate2);
            $("#icon-2").attr("src", "http://openweathermap.org/img/w/" + response3.list[11].weather[0].icon + ".png");
            $("#card-subtitle-2").text("Temp: " + response3.list[11].main.temp_max + " °F");
            $("#card-p-2").text("Humidity: " + response3.list[11].main.humidity + "%");

            $("#card-title-3").text(thirdDate2);
            $("#icon-3").attr("src", "http://openweathermap.org/img/w/" + response3.list[19].weather[0].icon + ".png");
            $("#card-subtitle-3").text("Temp: " + response3.list[19].main.temp_max + " °F");
            $("#card-p-3").text("Humidity: " + response3.list[19].main.humidity + "%");

            $("#card-title-4").text(fourthDate2);
            $("#icon-4").attr("src", "http://openweathermap.org/img/w/" + response3.list[27].weather[0].icon + ".png");
            $("#card-subtitle-4").text("Temp: " + response3.list[27].main.temp_max + " °F");
            $("#card-p-4").text("Humidity: " + response3.list[27].main.humidity + "%");

            $("#card-title-5").text(fifthDate2);
            $("#icon-5").attr("src", "http://openweathermap.org/img/w/" + response3.list[35].weather[0].icon + ".png");
            $("#card-subtitle-5").text("Temp: " + response3.list[35].main.temp_max + " °F");
            $("#card-p-5").text("Humidity: " + response3.list[35].main.humidity + "%");
            
        }); // third ajax function closing

    }); // first ajax function closing

}) // li click event closing










}); // jquery document ready closing
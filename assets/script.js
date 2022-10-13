//setting and giving value to global variables.
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var searchBtn = document.querySelector(".Btn");
var searchCity = document.querySelector(".searchCity");
var currentweather = document.querySelector(".weather-info");
var futureWeather = document.querySelector(".future-forcast");
var timeClass = document.querySelector(".time");
var dateClass = document.querySelector(".date");

var days = ["Sunday", "Monday", 'Tuesday', 'Wednesday', 'Thursday']

// setinveral to set up month/date/time and display on main page
setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay ();
    var hour = time.getHours();
    var hoursFormat12 = hour >= 13 ? hour %12: hour
    var minute = time.getMinutes();
    var ampm = hour >=12 ? 'PM' : 'AM'

    timeClass.innerHTML = hoursFormat12 + ':' + minute+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateClass.innerHTML = time.toDateString()

}, 1000);

//function for fetching city value and name, only displaying top 5 & 2 .then is always needed
function getGeo() {
    var searchCityValue = searchCity.value
    console.log(searchCityValue);
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + searchCityValue + "&limit=5&appid=" + apiKey)
        .then(function (res) {
            return res.json()
        }).then(function (data) {
            console.log(data);
            getWeather(data);
        })
}

//function with value of data. fetched lon and lat, set units
function getWeather(data) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey + "&units=imperial")
        .then(function (res) {
            return res.json()
        }).then(function (data) {
            getCurrentWeather(data);
            fiveDayForcast(data);
        })
}

searchBtn.addEventListener("click", getGeo);

//function to fetch data form api and displaying on main card.
function getCurrentWeather(data) {
    // console.log(data); variable for weather info from data
    var temperature = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;
    var realFeel = data.list[0].main.feels_like;
    // console.log(temperature); Create element for data to be displayed
    var temp = document.createElement("p");
    var hum = document.createElement("p");
    var wind = document.createElement("p");
    var feelsLike = document.createElement("p");
    //Adding text to the variable-adding displayed name-var
    temp.textContent = `temp: ${temperature}`;
    hum.textContent = `Humidity: ${humidity}`;
    wind.textContent = `Wind: ${windSpeed}`;
    feelsLike.textContent = `Real Feel: ${realFeel}`;
    //Appending element(p) to html when data is pulled
    currentweather.appendChild(temp);
    currentweather.appendChild(hum);
    currentweather.appendChild(wind);
    currentweather.appendChild(feelsLike);
}

//function for fetching and displaying weather forcast on cards.
function fiveDayForcast(data) {
    for(var i=0; i<data.list.length; i=i+8) {
        console.log(data.list[i])
        //Create Element for html and in order to display
        var dayCard = document.createElement("div");
        dayCard.setAttribute("class", "column border 10px solid p-3");
        dayCard.setAttribute("id", "wide");
        // Create var with a value from the list(data)
        var date = data.list[i].dt_txt;
        var temp = data.list[i].main.temp;
        var wind = data.list[i].wind.speed;
        var hum = data.list[i].main.humidity;
        var infoArray = [temp, wind, hum];
        dayCard.append(date);
        for(var j=0; j<infoArray.length; j++) {
            var dayCardDiv = document.createElement("p");
            dayCardDiv.setAttribute("class", "futureWeather");
            dayCard.textContent = `Date: ${date}`;
            dayCardDiv.textContent = `Temp: ${temp}`;
            dayCardDiv.textContent = `Wind: ${wind}`;
            dayCardDiv.textContent = `Humidity: ${hum}`;
            dayCardDiv.append(infoArray[j]);
            dayCard.append(dayCardDiv)
        }
        //Add element with value of var.value of data as above
        // dayCardDiv.append(wind);
        // dayCardDiv.append(hum);
        futureWeather.appendChild(dayCard);
    }
}
const api = {
    key: "a124aa17ed99d3ec1b1446055259df82",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    } //presses the enter key
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
} // fetches api and gets results and query

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let date = document.querySelector('.date');
    date.innerText = dateBuilder();

    let temp = document.querySelector('.current .temp');
    let newMain = (weather.main.temp) * 1.8 + 32;
    temp.innerHTML = `${Math.round(newMain)} <span>°F</span>`

    let weather_cast = document.querySelector('.current .weather');
    let cast = weather.weather[0].main;
    weather_cast.innerText = cast;

    let hilow = document.querySelector('.hi-low');
    let min = (weather.main.temp_min) * 1.8 + 32;
    let max = (weather.main.temp_max) * 1.8 + 32;
    hilow.innerText = `${Math.round(min)}°F / ${Math.round(max)}°F`;
    checkCast(cast);

    //the commented code displays the temperature in Celsuis
    /*let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`

    let weather_cast = document.querySelector('.current .weather');
    let cast = weather.weather[0].main;
    weather_cast.innerText = cast;

    let hilow = document.querySelector('.hi-low');
    let min = Math.round(weather.main.temp_min);
    let max = Math.round(weather.main.temp_max);
    hilow.innerText = `${min}°C / ${max}°C`;
    checkCast(cast);*/
    
}

function dateBuilder() {
    let months = ["January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday"];

    let d = new Date();
    let today = d.getDay();

    let day = days[today];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
}

function checkCast(c) {
    if (c == "Sunny" || c == "Clear") {
        document.body.style.backgroundImage = "url('./img/sunny.jpg')";
    } else if (c == "Clouds" || c == "Haze") {
        document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
    } else if (c == "Rain") {
        document.body.style.backgroundImage = "url('./img/rainy.jpg')";
    }
}

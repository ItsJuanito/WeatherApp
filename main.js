const api = {
    key: "a124aa17ed99d3ec1b1446055259df82",
    base: "https://api.openweathermap.org/data/2.5/"
} // api key and base

let mainTemp, min, max, newMain, newMax, newMin;
// set global variables to use for onclick event

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

let buttonF = document.querySelector(".F");
let buttonC = document.querySelector(".C");

buttonF.onclick = () => {
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(newMain)} <span>°F</span>`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(newMin)}°F / ${Math.round(newMax)}°F`;
} // converts the degrees to Fahrenheit

buttonC.onclick = () => {
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(mainTemp)} <span>°C</span>`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(min)}°C / ${Math.round(max)}°C`;
} // converts the degree to Celsuis

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    } //presses the enter key then calls getResult function
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
} // fetches api and gets results and query then displayResults is executed

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let date = document.querySelector('.date');
    date.innerText = dateBuilder();

    let temp = document.querySelector('.current .temp');
    mainTemp = weather.main.temp;
    newMain = (mainTemp) * 1.8 + 32;
    temp.innerHTML = `${Math.round(newMain)} <span>°F</span>`;

    let weather_cast = document.querySelector('.current .weather');
    let cast = weather.weather[0].main;
    weather_cast.innerText = cast;

    let hilow = document.querySelector('.hi-low');
    min = weather.main.temp_min;
    max = weather.main.temp_max;
    newMin = (min) * 1.8 + 32;
    newMax = (max) * 1.8 + 32;
    hilow.innerText = `${Math.round(newMin)}°F / ${Math.round(newMax)}°F`;
    checkCast(cast);
} // displays all query from api to index.html

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

    return `${day}, ${month} ${date}, ${year}`;
} // gets day, month, date, and year (of search)

function checkCast(c) {
    if (c == "Sunny" || c == "Clear") {
        document.body.style.backgroundImage = "url('./img/sunny.jpg')";
    } else if (c == "Clouds" || c == "Haze") {
        document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
    } else if (c == "Rain" || "Thunderstorm") {
        document.body.style.backgroundImage = "url('./img/rainy.jpg')";
    }
} // changes background image bases on the forecast

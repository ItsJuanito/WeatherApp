const api = {
    key: "a124aa17ed99d3ec1b1446055259df82",
    base: "https://api.openweathermap.org/data/2.5/"
} // api key and base

let mainTemp, min, max, feels, humidity, newMain, newMax, newMin, newF;
// set global variables to use for onclick event

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

let buttonF = document.querySelector(".F");
let buttonC = document.querySelector(".C");

buttonF.onclick = () => {

    if (humidity === undefined) {
        alert('You must search a city to switch the degrees');
    }

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(newMain)} <span>°F</span>`;

    let feel = document.querySelector('.feels');
    feel.innerText = `Feels like: ${Math.round(newF)}°F`;

    let humid = document.querySelector('.humidity');
    humid.innerText = `Humidity: ${humidity}%`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Hi-Low: ${Math.round(newMin)}°F / ${Math.round(newMax)}°F`;

} // converts the degrees to Fahrenheit

buttonC.onclick = () => {

    if (humidity === undefined) {
        alert('You must search a city to switch the degrees');
    }

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(mainTemp)} <span>°C</span>`;

    let feel = document.querySelector('.feels');
    feel.innerText = `Feels like: ${Math.round(feels)}°C`;

    let humid = document.querySelector('.humidity');
    humid.innerText = `Humidity: ${humidity}%`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Hi-Low: ${Math.round(min)}°C / ${Math.round(max)}°C`;

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
    try {
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    } catch(err) {
        /*let alrt = document.querySelector('p');
        alrt.innerText = `Enter another city`;*/
        alert('This city is not in our database. Enter another city please!');
        searchBox.value = '';
    }
    let date = document.querySelector('.date');
    date.innerText = dateBuilder();

    let temp = document.querySelector('.current .temp');
    mainTemp = weather.main.temp;
    newMain = (mainTemp) * 1.8 + 32;
    temp.innerHTML = `${Math.round(newMain)} <span>°F</span>`;

    let weather_cast = document.querySelector('.current .weather');
    let cast = weather.weather[0].main;
    weather_cast.innerText = cast;

    let feel = document.querySelector('.feels');
    feels = weather.main.feels_like;
    newF = weather.main.feels_like *1.8 + 32;
    feel.innerText = `Feels like: ${Math.round(newF)}°F`;

    let hilow = document.querySelector('.hi-low');
    min = weather.main.temp_min;
    max = weather.main.temp_max;
    newMin = (min) * 1.8 + 32;
    newMax = (max) * 1.8 + 32;
    hilow.innerText = `Hi-Low: ${Math.round(newMin)}°F / ${Math.round(newMax)}°F`;

    let humid = document.querySelector('.humidity');
    humidity = weather.main.humidity;
    humid.innerText = `Humidity: ${humidity}%`;
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
    } else if (c == "Clouds" || c == "Haze" || c == "Mist") {
        document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
    } else if (c == "Rain" || c == "Thunderstorm") {
        document.body.style.backgroundImage = "url('./img/rainy.jpg')";
    } else if (c == "Smoke") {
        document.body.style.backgroundImage = "url('./img/smoke.jpg')";           
    }
} // changes background image bases on the forecast

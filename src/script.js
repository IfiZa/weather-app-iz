//function changeBackGroundBody() {
//document.body.style.backgroundImage = "url('images/doodles/RainyDoodle.jpg')";}
//changeBackGroundBody();

function showCurrentWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;

  document.querySelector(".country").innerHTML = response.data.sys.country;

  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    ".weather-description-word"
  ).innerHTML = `${response.data.weather[0].description}`;

  document.querySelector(".min-max-temp").innerHTML = `Min ${Math.round(
    response.data.main.temp_min
  )}°C / Max ${Math.round(response.data.main.temp_max)}°C`;

  document.querySelector("#real-feel").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;

  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;

  document.querySelector("#pressure").innerHTML = `${Math.round(
    response.data.main.pressure
  )} hPa`;
}

// Search city

function searchCity(city) {
  if (city.length === 0) {
    alert("Please type a city!");
  } else {
    let apiKey = "4d99823db795b130f19970ddc3b4eb81";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCurrentWeather);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Brussels");

// Current city weather

function retrieveCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4d99823db795b130f19970ddc3b4eb81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

// Date display

let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednseday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let date = today.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let year = today.getFullYear();
let hours = String(today.getHours()).padStart(2, "0");
let minutes = String(today.getMinutes()).padStart(2, "0");

let now = document.querySelector(".current-date");
now.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

// Fahrenheit conversion

function convertToF(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector(".temperature");
  let temperature = tempFahrenheit.innerHTML;
  temperature = Number(temperature);
  tempFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let linkFahrenheit = document.querySelector(".unit-fahrenheit");
linkFahrenheit.addEventListener("click", convertToF);

function convertToC(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = 27;
}

let linkCelsius = document.querySelector(".unit-celsius");
linkCelsius.addEventListener("click", convertToC);

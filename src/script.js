//function changeBackGroundBody() {
//document.body.style.backgroundImage = "url('images/doodles/RainyDoodle.jpg')";}
//changeBackGroundBody();

function formatSunrise(timestamp) {
  let sunriseTime = new Date(timestamp);
  let hours = String(sunriseTime.getHours()).padStart(2, "0");
  let minutes = String(sunriseTime.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatSunset(timestamp) {
  let sunsetTime = new Date(timestamp);
  let hours = String(sunsetTime.getHours()).padStart(2, "0");
  let minutes = String(sunsetTime.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let today = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[today.getDay()];
  let date = today.getDate();
  let hours = String(today.getHours()).padStart(2, "0");
  let minutes = String(today.getMinutes()).padStart(2, "0");
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  return `${day} ${date} ${month}, ${hours}:${minutes}`;
}

function showCurrentWeather(response) {
  console.log(response);
  let cityElement = document.querySelector(".city");
  let countryElement = document.querySelector(".country");
  let temperatureElement = document.querySelector(".temperature");
  let descriptionElement = document.querySelector(".weather-description");
  let minMaxElement = document.querySelector(".min-max-temp");
  let realFeelElement = document.querySelector("#real-feel");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let dateElement = document.querySelector(".date");

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  minMaxElement.innerHTML = `Min ${Math.round(
    response.data.main.temp_min
  )}°C / Max ${Math.round(response.data.main.temp_max)}°C`;
  realFeelElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  pressureElement.innerHTML = `${Math.round(response.data.main.pressure)} hPa`;
  sunriseElement.innerHTML = formatSunrise(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatSunset(response.data.sys.sunset * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

// Date display

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

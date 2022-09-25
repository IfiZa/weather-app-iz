// function for Last Updated

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

// functions for Forecast

function formatForecastDate(timestamp) {
  let today = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[today.getDay()];
  let date = today.getDate();
  let month = today.getMonth() + 1;
  return `${day} ${date}/${month}`;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-2">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
    <div class="card text-center border-light mb-2 h-100 opacity-85">
      <div class="card-body" style="box-shadow:5px 5px 5px rgb(116, 126, 119); border-radius:4px">
        <h5 class="card-next-day">${formatForecastDate(
          forecastDay.dt * 1000
        )}</h5>
        <img src="images/icons/${forecastDay.weather[0].icon}.png"
          class="card-img-top"
          alt="${forecastDay.weather[0].description}"
          id="icon-forecast"
        />
        <p class="card-next-day-MinMax">${Math.round(
          forecastDay.temp.min
        )}°C / ${Math.round(forecastDay.temp.max)}°C</p>
      </div>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

// function for Current Weather

function showCurrentWeather(response) {
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector(".country");
  countryElement.innerHTML = response.data.sys.country;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector(".weather-description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;

  let minMaxElement = document.querySelector(".min-max-temp");
  minMaxElement.innerHTML = `Min ${Math.round(
    response.data.main.temp_min
  )}°C / Max ${Math.round(response.data.main.temp_max)}°C`;

  let realFeelElement = document.querySelector("#real-feel");
  realFeelElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${Math.round(response.data.main.pressure)} hPa`;

  let localDate = new Date();
  let localOffset = localDate.getTimezoneOffset() * 60000;

  let sunriseElement = document.querySelector("#sunrise");
  let sunriseUnix = response.data.sys.sunrise * 1000;
  let sunriseUTC = sunriseUnix + localOffset;
  let sunriseTime = new Date(sunriseUTC + 1000 * response.data.timezone);
  let sunriseHours = String(sunriseTime.getHours()).padStart(2, `0`);
  let sunriseMinutes = String(sunriseTime.getMinutes()).padStart(2, `0`);
  let sunrise = `${sunriseHours}:${sunriseMinutes}`;
  sunriseElement.innerHTML = sunrise;

  let sunsetElement = document.querySelector(`#sunset`);
  let sunsetUnix = response.data.sys.sunset * 1000;
  let sunsetUTC = sunsetUnix + localOffset;
  let sunsetTime = new Date(sunsetUTC + 1000 * response.data.timezone);
  let sunsetHours = String(sunsetTime.getHours()).padStart(2, `0`);
  let sunsetMinutes = String(sunsetTime.getMinutes()).padStart(2, `0`);
  let sunset = `${sunsetHours}:${sunsetMinutes}`;
  sunsetElement.innerHTML = sunset;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("src", `images/icons/${iconCode}.png`);

  if (iconCode === "01d") {
    document.body.style.backgroundImage = "url(images/doodles/01d.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(174, 192, 178, 0.7)";
  } else if (iconCode === "01n" || iconCode === "02n") {
    document.body.style.backgroundImage = "url(images/doodles/01n.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(116, 163, 176, 0.8)";
  } else if (iconCode === "02d") {
    document.body.style.backgroundImage = "url(images/doodles/02d.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(200, 178, 120, 0.4)";
  } else if (
    iconCode === "03d" ||
    iconCode === "03n" ||
    iconCode === "04d" ||
    iconCode === "04n"
  ) {
    document.body.style.backgroundImage = "url(images/doodles/03.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(171, 184, 174, 0.7)";
  } else if (iconCode === "09d" || iconCode === "09n") {
    document.body.style.backgroundImage = "url(images/doodles/09.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(174, 192, 178, 0.7)";
  } else if (iconCode === "10d" || iconCode === "10n") {
    document.body.style.backgroundImage = "url(images/doodles/10.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(174, 192, 178, 0.7)";
  } else if (iconCode === "11d" || iconCode === "11n") {
    document.body.style.backgroundImage = "url(images/doodles/11.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(172, 198, 187, 0.7)";
  } else if (iconCode === "13d" || iconCode === "13n") {
    document.body.style.backgroundImage = "url(images/doodles/13.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(151, 179, 183, 0.6);";
  } else if (iconCode === "50d" || iconCode === "50n") {
    document.body.style.backgroundImage = "url(images/doodles/50d.jpg)";
    document.querySelector(".container").style.backgroundColor =
      "rgb(221, 205, 184, 0.6)";
  }

  getForecast(response.data.coord);
}

// functions for Search City

function searchCity(city) {
  if (city.length === 0) {
    alert("Please type a city! 🏘");
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

// functions for Current Location

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

// Global Variables

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Brussels");

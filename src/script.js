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
        <img
          src="images/icons/few clouds.png"
          class="card-img-top"
          alt="Clear Sky"
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

function showCurrentWeather(response) {
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
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let iconMainCode = response.data.weather[0].main;
  // let containerElement = document.querySelector(".container");

  temperatureCelcious = response.data.main.temp;

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
  iconElement.setAttribute("alt", response.data.weather[0].description);
  if (iconMainCode === "Clear") {
    iconElement.setAttribute("src", `images/icons/sunny.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/SunnyDoodle.jpg')";
  } else if (iconMainCode === "Thunderstorm") {
    iconElement.setAttribute("src", `images/icons/thunderstorm.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/StormyDoodle.jpg')";
  } else if (iconMainCode === "Drizzle" || iconMainCode === "Rain") {
    iconElement.setAttribute("src", `images/icons/shower rain.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/RainyDoodle.jpg')";
  } else if (iconMainCode === "Snow") {
    iconElement.setAttribute("src", `images/icons/snow.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/SnowyDoodle.jpg')";
  } else if (iconMainCode === "Mist" || iconMainCode === "Fog") {
    iconElement.setAttribute("src", `images/icons/fog.png`);
  } else if (
    descriptionElement.innerHTML === "few clouds" ||
    descriptionElement.innerHTML === "scattered clouds"
  ) {
    iconElement.setAttribute("src", `images/icons/few clouds.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/SunCloudDoodle.jpg')";
  } else if (iconMainCode === "Mist" || iconMainCode === "Fog") {
    iconElement.setAttribute("src", `images/icons/fog.png`);
  } else if (
    descriptionElement.innerHTML === "broken clouds" ||
    descriptionElement.innerHTML === "overcast clouds"
  ) {
    iconElement.setAttribute("src", `images/icons/cloudy.png`);
    document.body.style.backgroundImage =
      "url('images/doodles/CloudyDoodle.jpg')";
  }

  getForecast(response.data.coord);
}

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

function convertToF(event) {
  event.preventDefault();
  let tempFahrenheit = Math.round((temperatureCelcious * 9) / 5 + 32);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = tempFahrenheit;
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(temperatureCelcious);
  linkFahrenheit.classList.remove("active");
  linkCelsius.classList.add("active");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let temperatureCelcious = null;

let linkFahrenheit = document.querySelector(".unit-fahrenheit");
linkFahrenheit.addEventListener("click", convertToF);

let linkCelsius = document.querySelector(".unit-celsius");
linkCelsius.addEventListener("click", convertToC);

searchCity("Brussels");

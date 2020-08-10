function updateMinutes(currentMinutes) {
  if (currentMinutes < 10) {
    return "0" + currentMinutes;
  } else {
    return currentMinutes;
  }
}
function getTimeOfDay(currentHours) {
  if (currentHours >= 12) {
    return "pm";
  } else {
    return "am";
  }
}

function displayTimeAndDate() {
  let time = document.querySelector("#current-time");
  let now = new Date();
  let timeOfDay = getTimeOfDay(now.getHours());
  let hours = [
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
  ];
  let hour = hours[now.getHours()];
  let minutes = updateMinutes(now.getMinutes());
  time.innerHTML = `As of ${hour}:${minutes} ${timeOfDay}`;
  let date = document.querySelector("#current-date");
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
  let month = months[now.getMonth()];
  let day = now.getDate();
  let year = now.getFullYear();
  date.innerHTML = `On ${month} ${day}, ${year}`;
}

function showTemperature(response) {
  displayTimeAndDate();
  likeTemp = Math.round(response.data.main.feels_like);
  high = Math.round(response.data.main.temp_max);
  low = Math.round(response.data.main.temp_min);
  fahrenheitTemperature = Math.round(response.data.main.temp);
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;
  document.querySelector(
    ".temperature"
  ).innerHTML = `${fahrenheitTemperature}°F`;
  document.querySelector("h2.city").innerHTML = response.data.name;
  document.querySelector("#high-low").innerHTML = `${high}° | ${low}°`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `Feels like ${likeTemp}°`;
  if (response.data.weather[0].main === "Clear") {
    document.querySelector("h1.temp-icon").innerHTML = `
      <i class="fas fa-sun"></i>`;
  } else {
    if (response.data.weather[0].main === "Clouds") {
      document.querySelector("h1.temp-icon").innerHTML = `
        <i class="fas fa-cloud"></i>`;
    } else {
      if (
        response.data.weather[0].main === "Drizzle" ||
        response.data.weather[0].main === "Rain"
      ) {
        document.querySelector("h1.temp-icon").innerHTML = `
          <i class="fas fa-cloud-rain"></i>`;
      } else {
        if (response.data.weather[0].main === "Snow") {
          document.querySelector("h1.temp-icon").innerHTML = `
            <i class="fas fa-snowflake"></i>`;
        } else {
          if (response.data.weather[0].main === "Thunderstorm") {
            document.querySelector("h1.temp-icon").innerHTML = `
              <i class="fas fa-bolt"></i>`;
          } else {
            document.querySelector("h1.temp-icon").innerHTML = `
              <i class="far fa-moon"></i>`;
          }
        }
      }
    }
  }
  let units = "imperial";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  searchCity(city.value);
}

function updateLocation(position) {
  let units = "imperial";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function findLocation() {
  navigator.geolocation.getCurrentPosition(updateLocation);
}

function toggleCelsius() {
  let heading = document.querySelector(".temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let celsiusHigh = Math.round(((high - 32) * 5) / 9);
  let celsiusLow = Math.round(((low - 32) * 5) / 9);
  let celsiusLikeTemp = Math.round(((likeTemp - 32) * 5) / 9);
  heading.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  document.querySelector(
    "#high-low"
  ).innerHTML = `${celsiusHigh}° | ${celsiusLow}°`;
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels like ${celsiusLikeTemp}°`;
  let units = "metric";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function toggleFahrenheit() {
  let heading = document.querySelector(".temperature");
  heading.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  document.querySelector("#high-low").innerHTML = `${high}° | ${low}°`;
  document.querySelector("#feels-like").innerHTML = `Feels like ${likeTemp}°`;
  let units = "imperial";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function updateProgressBar() {
  let now = new Date();
  let currentHour = now.getHours();
  let progressBar = document.querySelector("div.progress-bar");
  let widthPercentage = Math.round((currentHour / 24) * 100);
  progressBar.setAttribute("style", `width: ${widthPercentage}%;`);
  progressBar.setAttribute("aria-valuenow", "currentHour");
}

let fahrenheitTemperature = null;

let search = document.querySelector(".search-button");
search.addEventListener("click", handleSubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findLocation);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", toggleCelsius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", toggleFahrenheit);

updateProgressBar();

searchCity("Los Angeles");

function showForecast(response) {
  let forecastElement = document.querySelector(".five-day-forecast");
  let forecast = null;
  forecastElement.innerHTML = null;

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    if (forecast.weather[0].main === "Clear") {
      icon = `
      <i class="fas fa-sun"></i>`;
    } else {
      if (forecast.weather[0].main === "Clouds") {
        icon = `
        <i class="fas fa-cloud"></i>`;
      } else {
        if (
          forecast.weather[0].main === "Drizzle" ||
          forecast.weather[0].main === "Rain"
        ) {
          icon = `
          <i class="fas fa-cloud-rain"></i>`;
        } else {
          if (forecast.weather[0].main === "Snow") {
            icon = `
            <i class="fas fa-snowflake"></i>`;
          } else {
            if (forecast.weather[0].main === "Thunderstorm") {
              icon = `
              <i class="fas fa-bolt"></i>`;
            } else {
              icon = `
              <i class="far fa-moon"></i>`;
            }
          }
        }
      }
    }
    let date = new Date(forecast.dt * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfTheWeek = days[date.getDay()];
    forecastHigh = Math.round(forecast.temp.max);
    forecastLow = Math.round(forecast.temp.min);
    forecastElement.innerHTML += `
    <div class="col">
      <p class="day-one">
        ${dayOfTheWeek}
        <br />${icon}
        <div id="forecast-high-low"> 
        ${forecastHigh}° | ${forecastLow}°
        </div>
      </p>
    </div>
  `;
  }
}

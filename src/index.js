// Current Time & Date

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

// Current Temperature

function showTemperature(response) {
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let likeTemp = Math.round(response.data.main.feels_like);
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h2.city").innerHTML = response.data.name;
  document.querySelector("#high-low").innerHTML = `${high}° | ${low}°`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `Feels like ${likeTemp}°`;
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
let search = document.querySelector(".search-button");
search.addEventListener("click", handleSubmit);

function updateLocation(position) {
  let units = "imperial";
  let apiKey = "74759ba87cafa7b384b77efd8fb12cec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function findLocation() {
  navigator.geolocation.getCurrentPosition(updateLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findLocation);

searchCity("Los Angeles");

// Temperature Units

function toggleCelsius() {
  let units = document.querySelector("#units").innerHTML;
  units = units.trim();
  if (units === "°F") {
    let fahrenheitTemperature = document.querySelector("#current-temp")
      .textContent;
    fahrenheitTemperature = fahrenheitTemperature.trim();
    let heading = document.querySelector(".temperature");
    let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
    heading.innerHTML = `${celsiusTemperature} °C`;
  }
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toggleCelsius);

function toggleFahrenheit() {
  let units = document.querySelector("#units").innerHTML;
  units = units.trim();
  if (units === "°C") {
    let celsiusTemperature = document.querySelector("#current-temp")
      .textContent;
    celsiusTemperature = celsiusTemperature.trim();
    let heading = document.querySelector(".temperature");
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    heading.innerHTML = `${fahrenheitTemperature} °F`;
  }
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toggleFahrenheit);

// Sunrise to Sunset Bar

function updateProgressBar() {
  let now = new Date();
  let currentHour = now.getHours();
  let progressBar = document.querySelector("div.progress-bar");
  let widthPercentage = Math.round((currentHour / 24) * 100);
  progressBar.setAttribute("style", `width: ${widthPercentage}%;`);
  progressBar.setAttribute("aria-valuenow", "currentHour");
}
updateProgressBar();

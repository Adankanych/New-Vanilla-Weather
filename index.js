function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#main-temperature");
  let descriptionElement = document.querySelector("#description");
  let feelsLifeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLifeElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "8f92bcf1448991b5fa444b563468f01b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleWeather");
  search(city.value);
}
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let toFahrenheit = document.querySelector("#fahrenheit-link");
toFahrenheit.addEventListener("click", convertToFarenheit);

let toCelsius = document.querySelector("#celsius-link");
toCelsius.addEventListener("click", convertToCelsius);

search("Moscow");
/*function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);*/

//Feature #1 display the current date and time using Javascript

let currentTime = new Date();

let currentHour = currentTime.getHours();
let currentMintues = currentTime.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMintues < 10) {
  currentMintues = `0${currentMintues}`;
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

let currentDay = days[currentTime.getDay()];
let h3 = document.querySelector("h3");
h3.innerHTML = `${currentDay} ${currentHour}:${currentMintues}`;

//Bonus Feature: add link to convert Celsius to Fahrenheit
/*function convertToFarenheit(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = "80";
}

let toFahrenheit = document.querySelector("#fahrenheit-link");
toFahrenheit.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = "27";
}

let toCelsius = document.querySelector("#celsius-link");
toCelsius.addEventListener("click", convertToCelsius); */

function showWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function findCity(city) {
  let apiKey = "8f92bcf1448991b5fa444b563468f01b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmitEvent(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleWeather").value;
  findCity(city);
}

function findLocation(position) {
  let apiKey = "8f92bcf1448991b5fa444b563468f01b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}
let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmitEvent);

findCity("Grove City");

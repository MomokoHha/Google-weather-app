// creating new function for date response.data.dt/timestamp=millisec since 1970
// formatDate function will receive timestamp which is response.data.dt
function formatDate(timestamp) {
  //calculate the date
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
    "Moday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// --------search----------
function search(city) {
  let apiKey = "a517e2f077fee2ef9b2aa7d6e87f83b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  // console.log(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("New York");
// --------------unit conversion----------
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the fahrenheit link
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  // alert(celciusTemperature);
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}
let apiKey = "a517e2f077fee2ef9b2aa7d6e87f83b4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20york&appid=${apiKey}&units=imperial`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

let apiKey = "...";
let city = "Paris";
let apiUrl = `https://api.operweathermap.org/data/2.5/weather?q=${city}&units=...`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#current-weather-description");
  temperatureElement.innerHTML = `${temperature}&degF`;
  description.innerHTML = response.data.weather[0].description;
}

let h1 = document.querySelector("#city");
h1.innerHTML = city;

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

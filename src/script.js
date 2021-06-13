function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let now = new Date();
  let day = weekdays[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let suffix = document.querySelector("#suffix");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let timeSuffix = null;
  if (hour < 12) {
    timeSuffix = "am";
  } else {
    timeSuffix = "pm";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (date === 1 || date === 21 || date === 31) {
    suffix.innerHTML = "st";
  } else if (date === 2 || date === 22) {
    suffix.innerHTML = "nd";
  } else if (date === 3 || date === 23) {
    suffix.innerHTML = "rd";
  } else {
    suffix.innerHTML = "th";
  }

  // console.log(now.toLocaleTimeString());
  // I don't know how to implement .toLocaleTimeString into the webpage yet

  document.querySelector(
    "#current-time"
  ).innerHTML = `${hour}:${minutes} ${timeSuffix}`;
  document.querySelector("#date").innerHTML = `${day}, ${month} ${date}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDate = date.getDate();

  return forecastDate;
}

function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return months[month];
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index <= 6) {
      //the following two lines can also be written as: forecastHTML +=
      forecastHTML =
        forecastHTML +
        `     
          <div class="col-2 future-forecast">
          <div id="forecast-date-group">
          <div class="forecast-date">${formatMonth(
            forecastDay.dt
          )}/${formatForecastDate(forecastDay.dt)}</div>
            <div>
              <div class="forecast-date-border">${formatDay(
                forecastDay.dt
              )}</div>
            </div>
          
            </div>
            <div class="forecast-weather-icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="${forecastDay.weather[0].description}"
                class="forecast-weather-icon"
              />
            </div>
            <div class="forecast-high-temp">${Math.round(
              forecastDay.temp.max
            )}&deg</div>
            <div class="forecast-low-temp">${Math.round(
              forecastDay.temp.min
            )}&deg</div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  unit = "imperial";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiKey = "fffd06c6f67e1f436ef14a830d4aa701";
  let apiUrl = `${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&exclude=current,minutely,hourly&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWindData(response) {
  let windUnit = document.querySelector("#wind-unit");
  let windSpeed = document.querySelector("#wind-speed");

  windUnit.innerHTML = " mi/h ";
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 2.232);

  let windDegrees = response.data.wind.deg;
  let windDirection = document.querySelector("#wind-direction");

  if (
    (windDegrees >= 0 && windDegrees < 11.25) ||
    (windDegrees >= 348.75 && windDegrees < 360)
  ) {
    windDirection.innerHTML = "N";
  } else if (windDegrees >= 11.25 && windDegrees < 33.75) {
    windDirection.innerHTML = "NNE";
  } else if (windDegrees >= 33.75 && windDegrees < 56.25) {
    windDirection.innerHTML = "NE";
  } else if (windDegrees >= 56.25 && windDegrees < 78.75) {
    windDirection.innerHTML = "ENE";
  } else if (windDegrees >= 78.75 && windDegrees < 101.25) {
    windDirection.innerHTML = "E";
  } else if (windDegrees >= 101.25 && windDegrees < 123.75) {
    windDirection.innerHTML = "ESE";
  } else if (windDegrees >= 123.75 && windDegrees < 146.25) {
    windDirection.innerHTML = "SE";
  } else if (windDegrees >= 146.25 && windDegrees < 168.75) {
    windDirection.innerHTML = "SSE";
  } else if (windDegrees >= 168.75 && windDegrees < 191.25) {
    windDirection.innerHTML = "S";
  } else if (windDegrees >= 191.25 && windDegrees < 213.75) {
    windDirection.innerHTML = "SSW";
  } else if (windDegrees >= 213.75 && windDegrees < 236.25) {
    windDirection.innerHTML = "SW";
  } else if (windDegrees >= 236.25 && windDegrees < 258.75) {
    windDirection.innerHTML = "WSW";
  } else if (windDegrees >= 258.75 && windDegrees < 281.25) {
    windDirection.innerHTML = "W";
  } else if (windDegrees >= 281.25 && windDegrees < 303.75) {
    windDirection.innerHTML = "WNW";
  } else if (windDegrees >= 303.75 && windDegrees < 326.25) {
    windDirection.innerHTML = "NW";
  } else if (windDegrees >= 326.25 && windDegrees < 348.75) {
    windDirection.innerHTML = "NNW";
  }
}

function displayPressure(response) {
  document.querySelector("#pressure-amount").innerHTML =
    Math.round(response.data.main.pressure * 3) / 100;
}

function displayVisibility(response) {
  let visibility = document.querySelector("#visibility-amount");
  let visibilityUnit = document.querySelector("#visibility-unit");

  visibility.innerHTML =
    Math.round(response.data.visibility * 0.0062137119) / 10;
  visibilityUnit.innerHTML = "mi";
}

function displayAirQuality(response) {
  let aqi = response.data.data.aqi;
  let airQualityRating = document.querySelector("#air-quality-rating");
  let airQualityDescription = document.querySelector(
    "#air-quality-description"
  );
  if (aqi <= 50) {
    airQualityDescription.innerHTML = "Good";
  } else if (aqi > 50 && aqi <= 100) {
    airQualityDescription.innerHTML = "Moderate";
  } else if (aqi > 100 && aqi <= 150) {
    airQualityDescription.innerHTML =
      "<small>Unhealthy<br>(Sensitive groups)</small>";
  } else if (aqi > 150 && aqi <= 200) {
    airQualityDescription.innerHTML = "Unhealthy";
  } else if (aqi > 200 && aqi <= 300) {
    airQualityDescription.innerHTML = "<small>Very Unhealthy</small>";
  } else if (aqi > 300) {
    airQualityDescription.innerHTML = "Hazardous";
  } else {
    airQualityDescription.innerHTML = "unknown";
  }

  if (aqi == null) {
    airQualityRating.innerHTML = "-";
  } else {
    airQualityRating.innerHTML = aqi;
  }
}

function getAirQuality(response) {
  city = response.data.name;
  let aqiApiToken = "a551fc0df656990285c1e8f454235fd89ac3eaf8";
  let aqiApiEndpoint = "https://api.waqi.info/feed/";
  let aqiApiUrl = `${aqiApiEndpoint}${city}/?token=${aqiApiToken}`;

  axios.get(`${aqiApiUrl}`).then(displayAirQuality);
}

function displayTemperatureFahrenheit(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(tempF);
  document.querySelector("#current-temperature-scale").innerHTML = "&degF";
  document.querySelector("#today-high-temp").innerHTML =
    Math.round(currentHighTemp) + "&deg";
  document.querySelector("#today-low-temp").innerHTML =
    Math.round(currentLowTemp) + "&deg";
  document.querySelector("#feels-like").innerHTML =
    Math.round(currentRealFeelTemp);
  document.querySelector("#feels-like-temp-scale").innerHTML = "&degF";
}

function displayCurrentConditions(response) {
  // temperature (current, high, low, feels like)
  tempF = response.data.main.temp;
  currentHighTemp = response.data.main.temp_max;
  currentLowTemp = response.data.main.temp_min;
  currentRealFeelTemp = response.data.main.feels_like;

  displayTemperatureFahrenheit(response);
  // weather description
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].description;
  // humidity
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // time & date
  formatDate(response.data.coord.dt * 1000);
  // show weather icon
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  // get pressure
  displayPressure(response);
  // wind
  displayWindData(response);
  // visibility
  displayVisibility(response);
  // air quality;
  getAirQuality(response);
  // get forecast
  getForecast(response.data.coord);
}

function displaySearchLocation(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherTitle = document.querySelector("#weather-title");
  let searchLocation = document.querySelector("#search-location");

  weatherTitle.innerHTML = `Weather in`;
  searchLocation.innerHTML = `${city}, ${country}`;
}

function retrievePosition(position) {
  document.querySelector("#search-text-input").value = "";
  unit = "imperial";
  let speed = "metric";
  let apiKey = "fffd06c6f67e1f436ef14a830d4aa701";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}appid=${apiKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&speed=${speed}`;

  axios.get(`${apiUrl}`).then(displaySearchLocation);
  axios.get(`${apiUrl}`).then(displayCurrentConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function search(city) {
  unit = "imperial";
  let speed = "metric";
  let apiKey = "fffd06c6f67e1f436ef14a830d4aa701";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&units=${unit}&${speed}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(displaySearchLocation);
  axios.get(`${apiUrl}`).then(displayCurrentConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

// Global temperature variables
let tempF = null;
let currentHighTemp = null;
let currentLowTemp = null;
let currentRealFeelTemp = null;
let unit = null;

// Get Current Location on button click
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Search form event listener
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Get New York Weather on Page Load
search("New York");

function getCurrentDate() {
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
  let day = weekdays[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let suffix = document.querySelector("#suffix");
  let hour = now.getHours();
  let minutes = now.getMinutes();
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

  now.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  console.log(now.toLocaleTimeString());
  // I don't know how to implement .toLocaleTimeString into the webpage yet

  document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`;
  document.querySelector("#date").innerHTML = `${day}, ${month} ${date}`;
}

function convertToCelsius(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-temperature-scale").innerHTML = "&degC";
  document.querySelector("#today-high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#today-low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#today-high-temp-scale").innerHTML = "&degC";
  document.querySelector("#today-low-temp-scale").innerHTML = "&degC";
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#feels-like-temp-scale").innerHTML = "&degC";
}

function convertToFahrenheit(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    (response.data.main.temp * 9) / 5 + 32
  );
  document.querySelector("#current-temperature-scale").innerHTML = "&degF";
  document.querySelector("#today-high-temp").innerHTML = Math.round(
    (response.data.main.temp_max * 9) / 5 + 32
  );
  document.querySelector("#today-low-temp").innerHTML = Math.round(
    (response.data.main.temp_min * 9) / 5 + 32
  );
  document.querySelector("#today-high-temp-scale").innerHTML = "&degF";
  document.querySelector("#today-low-temp-scale").innerHTML = "&degF";
  document.querySelector("#feels-like").innerHTML = Math.round(
    (response.data.main.feels_like * 9) / 5 + 32
  );
  document.querySelector("#feels-like-temp-scale").innerHTML = "&degF";
}

function getTemperatureScale(response) {
  let country = response.data.sys.country;

  if (
    country === "US" ||
    country === "BZ" ||
    country === "PW" ||
    country === "BS" ||
    country === "KY"
  ) {
    convertToFahrenheit(response);
  } else {
    convertToCelsius(response);
  }
}

function showSearchLocation(response) {
  let city = response.data.name;
  let country = response.data.sys.country;

  document.querySelector("#weather-title").innerHTML = `Weather in`;
  document.querySelector("#search-location").innerHTML = `${city}, ${country}`;
}

function getWindData(response) {
  let windUnit = document.querySelector("#wind-unit");
  let country = response.data.sys.country;

  if (
    country === "US" ||
    country === "UK" ||
    country === "PR" ||
    country === "BS" ||
    country === "AG" ||
    country === "VG" ||
    country === "BM" ||
    country === "KN" ||
    country === "LC" ||
    country === "VI" ||
    country === "GD" ||
    country === "GI" ||
    country === "SH" ||
    country === "WS" ||
    country === "VC" ||
    country === "GU" ||
    country === "LR" ||
    country === "MM"
  ) {
    windUnit.innerHTML = " mi/h ";
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed * 3.6 * 0.62
    );
  } else {
    windUnit.innerHTML = " km/h ";
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed * 3.6
    );
  }

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

function displayCurrentConditions(response) {
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //let precipitation = document.querySelector("#precipitation");
  //let precipitationInput = response.data.if();
}

function getSunriseSunset(response) {
  //this function is not functional
  let sunriseTimestamp = response.data.sys.sunrise;
  let sunsetTimestamp = response.data.sys.sunset;
  let timezone = response.data.timezone;
  let adjustedSunrise = sunriseTimestamp + timezone;
  let adjustedSunset = sunsetTimestamp + timezone;
  console.log(adjustedSunrise);
  let sunrise = new Date(adjustedSunrise);
  let sunset = new Date(adjustedSunset);
  console.log(sunrise.getTime());
  console.log(sunrise);
  console.log(sunset.getTime());
  console.log(sunset);
}

function displayAdditionalConditions(response) {
  console.log(response);
  getSunriseSunset;
  // getAirQuality;
  // getVisibility;
}

function search(city) {
  let unit = "metric";
  let speed = "metric";
  let apiKey = "fffd06c6f67e1f436ef14a830d4aa701";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiSearchUrl = `${apiEndpoint}q=${city}&units=${unit}&${speed}&appid=${apiKey}`;

  axios.get(`${apiSearchUrl}`).then(showSearchLocation);
  axios.get(`${apiSearchUrl}`).then(getTemperatureScale);
  axios.get(`${apiSearchUrl}`).then(displayCurrentConditions);
  axios.get(`${apiSearchUrl}`).then(displayAdditionalConditions);
  axios.get(`${apiSearchUrl}`).then(getWindData);
  //axios.get(`${apiSearchUrl}`).then();
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function showCurrentLocation(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherTitle = document.querySelector("#weather-title");
  let searchLocation = document.querySelector("#search-location");

  weatherTitle.innerHTML = `Weather in`;
  searchLocation.innerHTML = `${city}, ${country}`;
}

function retrievePosition(position) {
  document.querySelector("#search-text-input").value = "";
  let unit = "metric";
  let speed = "metric";
  let apiKey = "fffd06c6f67e1f436ef14a830d4aa701";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}appid=${apiKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&${speed}`;

  axios.get(`${apiUrl}`).then(showCurrentLocation);
  axios.get(`${apiUrl}`).then(getTemperatureScale);
  axios.get(`${apiUrl}`).then(displayCurrentConditions);
  axios.get(`${apiUrl}`).then(getWindData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// Get New York Weather on Page Load

search("New York");

// Get Current Location on Button Click

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Current Time Display

let now = new Date();
getCurrentDate();

// Show Search Location

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Temperature Conversion *broken*

let fahrenheitButton = document.querySelector("#fahrenheit-button");
let celsiusButton = document.querySelector("#celsius-button");

celsiusButton.addEventListener("click", convertToCelsius);

fahrenheitButton.addEventListener("click", convertToFahrenheit);

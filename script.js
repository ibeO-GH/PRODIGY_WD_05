const apiKey = "d46f6e7725d1871fe9a2ac3c50eec930";
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const errorMessage = document.querySelector(".error");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const precipitation = document.getElementById("precipitation");
const weatherContainer = document.querySelector(".weatherInfo-container");

searchButton.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const city = cityInput.value;
  errorMessage.style.display = "none";
  weatherInfo.style.display = "none";
  weatherContainer.style.display = "none";

  cityName.textContent = "";
  description.textContent = "";
  temperature.textContent = "";
  humidity.textContent = "";
  windSpeed.textContent = "";
  precipitation.textContent = "";

  if (!city) return;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (response.ok) {
    const data = await response.json();
    displayWeather(data);
  } else {
    errorMessage.style.display = "block";
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = `${data.weather[0].description}`;

  const weatherImage = document.getElementById("weather-image");
  const iconCode = data.weather[0].icon; // Get the weather icon code
  weatherImage.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Set the image source

  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  precipitation.textContent = `Precipitation: ${
    data.rain ? data.rain["1h"] + " mm" : "0 mm"
  }`;

  weatherInfo.style.display = "block";
  weatherContainer.style.display = "block";
}

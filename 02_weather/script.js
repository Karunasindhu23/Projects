document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const displayCity = document.getElementById("city-name");
  const displayTemperature = document.getElementById("temperature");
  const displayHumidity = document.getElementById("humidity");
  const displayCondition = document.getElementById("condition");
  const displayWind = document.getElementById("wind");
  const displayPressure = document.getElementById("pressure");
  const displaySunrise = document.getElementById("sunrise");
  const displayLocalTime = document.getElementById("localtime");
  const errorMessage = document.getElementById("error-message");

  const apiKey = "a76abe63590784ff30a3a89d654ce6dc";

  // When button clicked
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (city) {
      // Fetch by city name
      try {
        const data = await fetchWeatherdata(city);
        displayWeatherdata(data);
      } catch (error) {
        showError("City not found or API error");
      }
    } else {
      // Fetch by current location if input is empty
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const data = await fetchWeatherByCoords(lat, lon);
              displayWeatherdata(data);
            } catch (error) {
              showError("Unable to fetch weather for your location");
            }
          },
          () => {
            showError("Please allow location access or enter a city name");
          }
        );
      } else {
        showError("Geolocation not supported by your browser");
      }
    }
  });

  // Fetch weather using city name
  async function fetchWeatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();
    return data;
  }

  // Fetch weather using current coordinates
  async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Location weather fetch failed");
    }

    const data = await response.json();
    return data;
  }

  // Display fetched weather data
  function displayWeatherdata(data) {
    const { name, main, weather, wind, sys, timezone } = data;

    displayCity.textContent = `${name}, ${sys.country}`;
    displayTemperature.textContent = `🌡 Temperature: ${main.temp}°C (Feels like ${main.feels_like}°C)`;
    displayHumidity.textContent = `💧 Humidity: ${main.humidity}%`;
    displayCondition.textContent = `🌤 Condition: ${weather[0].description}`;
    displayWind.textContent = `💨 Wind: ${(wind.speed * 3.6).toFixed(2)} km/h`;
    displayPressure.textContent = `🔽 Pressure: ${main.pressure} hPa`;

    // Sunrise & Sunset
    const sunriseTime = new Date(sys.sunrise * 1000);
    const sunsetTime = new Date(sys.sunset * 1000);

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    displaySunrise.textContent = `🌅 Sunrise: ${sunriseTime.toLocaleTimeString("en-IN", timeOptions)} | 🌇 Sunset: ${sunsetTime.toLocaleTimeString("en-IN", timeOptions)}`;

    // Local time
    const nowUTC = Date.now(); // UTC timestamp
    const localTime = new Date(nowUTC + timezone * 1000);

    const dateOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    displayLocalTime.textContent = `🕒 Local Time: ${localTime.toLocaleString("en-IN", dateOptions)}`;

    // Show data
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // Show error message
  function showError(message = "An error occurred") {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = message;
  }
});

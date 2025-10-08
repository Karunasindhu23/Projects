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

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const data = await fetchWeatherdata(city);
      displayWeatherdata(data);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    // console.log(typeof response);
    // console.log("Response:", response);

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherdata(data) {
    console.log("Data:", data);
    const { name, main, weather, wind, sys, timezone } = data;

    displayCity.textContent = `${name}, ${sys.country}`;
    displayTemperature.textContent = `Temperature: ${main.temp}°C (Feels like ${main.feels_like}°C)`;
    displayHumidity.textContent = `Humidity: ${main.humidity}%`;
    displayCondition.textContent = `Condition: ${weather[0].description}`;
    displayWind.textContent = `Wind: ${(wind.speed * 3.6).toFixed(2)} km/h`;
    displayPressure.textContent = `Pressure: ${main.pressure} hPa`;
    const sunrise = sys.sunrise;
    const sunset = sys.sunset;
    // const time = timezone // in Seconds

    const sunriseTime = new Date((sunrise) * 1000);
    const sunsetTime = new Date((sunset) * 1000);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    displaySunrise.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString('en-IN', options)} | Sunset: ${sunsetTime.toLocaleTimeString('en-IN', options)}`;
    
    const nowUTC = Date.now(); // current UTC in ms
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

    displayLocalTime.textContent = `LocalTime: ${localTime.toLocaleString("en-IN", dateOptions)}`

    // Unlock display Property
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add('hidden')
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});

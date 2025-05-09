var weatherApi = "/weather";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const mlPredictionElement = document.querySelector(".mlPrediction");
const forecastListElement = document.querySelector(".forecastList");

const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = new Date().getDate() + ", " + monthName;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationElement.textContent = "Loading...";
  weatherIcon.className = "";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  humidityElement.textContent = "";
  windElement.textContent = "";
  mlPredictionElement.textContent = "";
  forecastListElement.innerHTML = "";

  showData(search.value);
});

function showData(city) {
  getWeatherData(city, (result) => {
    if (result && !result.error) {
      locationElement.textContent = result.current.name;
      tempElement.textContent = (result.current.main.temp - 273.15).toFixed(2) + "°C";
      weatherCondition.textContent = result.current.weather[0].description.toUpperCase();
      humidityElement.textContent = "Humidity: " + result.current.main.humidity + "%";
      windElement.textContent = "Wind Speed: " + result.current.wind.speed + " m/s";
      mlPredictionElement.textContent = result.mlPrediction.clothingSuggestion;

      result.forecast.forEach((entry) => {
        const li = document.createElement("li");
        const time = new Date(entry.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const temp = (entry.main.temp - 273.15).toFixed(2) + "°C";
        li.textContent = `${time} - ${entry.weather[0].description}, ${temp}`;
        forecastListElement.appendChild(li);
      });

      const desc = result.current.weather[0].description.toLowerCase();
      if (desc.includes("rain") || desc.includes("fog")) {
        weatherIcon.className = "wi wi-day-" + desc;
      } else {
        weatherIcon.className = "wi wi-day-cloudy";
      }
    } else {
      locationElement.textContent = result.error || "City not found.";
    }
  });
}

function getWeatherData(city, callback) {
  const locationApi = weatherApi + "?address=" + city;
  fetch(locationApi)
    .then((response) => response.json())
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      callback({ error: "Unable to fetch weather data" });
    });
}

const darkModeToggle = document.querySelector(".dark-mode-toggle");
const bodyElement = document.body;

if (localStorage.getItem("darkMode") === "true") {
  bodyElement.classList.add("dark-mode");
  darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-mode");
  if (bodyElement.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "true");
    darkModeToggle.textContent = "Light Mode";
  } else {
    localStorage.setItem("darkMode", "false");
    darkModeToggle.textContent = "Dark Mode";
  }
});

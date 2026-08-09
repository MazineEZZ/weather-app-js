import { fetchWeather } from "../api/weather-api";
import { appState } from "../global/state";
import { refreshPage } from "../logic/app-logic";

async function searchWeather() {
  const searchBar = appState.searchBar;

  if (searchBar.value) {
    const city = searchBar.value.trim();
    const result = await fetchWeather(city);
    getWeatherDetails(result);
  }
  refreshPage();
}

function getWeatherDetails(string) {
  const weatherDetails = {};

  const currCond = string.currentConditions;

  weatherDetails["name"] = string.address;
  weatherDetails["description"] = string.description;
  weatherDetails["conditions"] = currCond.conditions;
  weatherDetails["temperature"] = appState.convertTemp(currCond.temp);
  weatherDetails["rain-probability"] = currCond.precipprob;
  weatherDetails["humidity"] = currCond.humidity;
  weatherDetails["uvindex"] = currCond.uvindex;
  weatherDetails["sunrise"] = currCond.sunrise;
  weatherDetails["sunset"] = currCond.sunset;
  weatherDetails["windspeed"] = currCond.windspeed;

  appState.weatherDetails = weatherDetails;
}

function setUpEventListeners() {
  const appWrapper = appState.appWrapper;

  appWrapper.addEventListener("click", (e) => {
    if (e.target.id === "search-btn") {
      searchWeather();
    }
  });
}

export { setUpEventListeners };

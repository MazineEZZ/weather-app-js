import { fetchWeatherCoords } from "../api/weather-api";
import { appState } from "../global/state";
import { refreshPage, updateTemp } from "../logic/app-logic";

async function searchWeather() {
  const searchBar = appState.searchBar;

  if (searchBar.value) {
    appState.error = false;
    const city = searchBar.value.trim();
    await fetchWeatherCoords(city)
      .then((result) => getWeatherDetails(result))
      .catch((err) => {
        appState.error = err;
      });
  }
  refreshPage();
}

function getWeatherDetails(json) {
  const weatherDetails = {};

  const currCond = json.currentConditions;

  console.log(json);

  // Coords
  weatherDetails["lat"] = json.latitude;
  weatherDetails["lon"] = json.longitude;

  // Condtions
  weatherDetails["city-name"] = json.address;
  weatherDetails["desc"] = json.description;
  weatherDetails["conditions"] = currCond.conditions;
  weatherDetails["temp"] = currCond.temp;
  weatherDetails["icon"] = currCond.icon;

  // Highlights
  weatherDetails["windspeed"] = currCond.windspeed;
  weatherDetails["rain-probability"] = currCond.precipprob;
  weatherDetails["humidity"] = currCond.humidity;
  weatherDetails["uvindex"] = currCond.uvindex;
  weatherDetails["time"] = currCond.datetime.split(":").splice(0, 2).join(":");
  weatherDetails["sunrise"] = currCond.sunrise
    .split(":")
    .splice(0, 2)
    .join(":");
  weatherDetails["sunset"] = currCond.sunset.split(":").splice(0, 2).join(":");

  // Forecast
  weatherDetails["forecast"] = json.days
    .map((day) => {
      const newDayObj = {};
      newDayObj["icon"] = day.icon;
      newDayObj["temp"] = day.temp;
      newDayObj["date"] = day.datetime;

      return newDayObj;
    })
    .splice(1, 5);

  appState.weatherDetails = weatherDetails;
}

function toggleTempMeasure() {
  appState.tempUnit = appState.tempUnit === "C" ? "F" : "C";
  updateTemp();
}

function setUpEventListeners() {
  const appWrapper = appState.appWrapper;

  appWrapper.addEventListener("click", (e) => {
    if (e.target.id === "search-btn") {
      searchWeather();
    }

    if (e.target.id === "toggle-temp") {
      toggleTempMeasure();
    }
  });
}

export { setUpEventListeners };

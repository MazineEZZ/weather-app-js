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

function getWeatherDetails(json) {
  const weatherDetails = {};

  const currCond = json.currentConditions;

  console.log(json);

  // Condtions
  weatherDetails["city-name"] = json.address;
  weatherDetails["desc"] = json.description;
  weatherDetails["conditions"] = currCond.conditions;
  weatherDetails["temp"] = appState.convertTemp(currCond.temp);
  weatherDetails["icon"] = currCond.icon;

  // Highlights
  weatherDetails["windspeed"] = currCond.windspeed;
  weatherDetails["rain-probability"] = currCond.precipprob;
  weatherDetails["humidity"] = currCond.humidity;
  weatherDetails["uvindex"] = currCond.uvindex;
  weatherDetails["sunrise"] = currCond.sunrise;
  weatherDetails["sunset"] = currCond.sunset;

  // Forecast
  weatherDetails["forecast"] = json.days
    .map((day) => {
      const newDayObj = {};
      newDayObj["icon"] = day.icon;
      newDayObj["temp"] = appState.convertTemp(day.temp);
      newDayObj["date"] = day.datetime;
      // newDayObj["day-name"] = ;

      return newDayObj;
    })
    .splice(1, 5);

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

import { appState } from "../global/state";
import { createDOM } from "../utils/dom-utils";

function createCondContainer(weather) {
  const condContainer = createDOM({
    id: "condition-container",
    classArr: ["container"],
    same: true,
  });

  const details = createDOM({
    classArr: ["details"],
  });

  const icon = createDOM({
    kind: "img",
    classArr: ["icon"],
    alt: weather["icon"],
  });

  const temp = createDOM({
    kind: "p",
    id: "temp",
    same: true,
  });
  temp.dataset.id = "temp";
  temp.dataset.rawTemp = weather["temp"];

  details.appendChild(icon);
  details.appendChild(temp);

  const condition = createDOM({
    kind: "p",
    classArr: ["conditions"],
    text: weather["conditions"],
  });

  const lineBreaker = createDOM({
    kind: "hr",
  });

  const cityName = createDOM({
    kind: "h4",
    classArr: ["city-name"],
    text: weather["city-name"],
  });

  condContainer.appendChild(details);
  condContainer.appendChild(condition);
  condContainer.appendChild(lineBreaker);
  condContainer.appendChild(cityName);

  return condContainer;
}

function createHighlightContainer(weather) {
  const hlContainer = createDOM({
    id: "hl-container",
    classArr: ["container"],
    same: true,
  });

  const features = ["Wind Status", "UV Index", "Sunrise & Sunset"];
  const datas = [
    weather["windspeed"],
    weather["uvindex"],
    "Under Construction...",
  ];

  features.forEach((feat, i) => {
    const container = createDOM({
      classArr: ["subcontainer"],
    });

    const title = createDOM({
      kind: "h3",
      classArr: ["title"],
      text: feat,
    });

    const data = createDOM({
      kind: "p",
      classArr: ["data"],
      text: String(datas[i]),
    });

    container.appendChild(title);
    container.appendChild(data);

    hlContainer.appendChild(container);
  });

  return hlContainer;
}

function createForecastContainer(weather) {
  const forecastContainer = createDOM({
    id: "forecast-container",
    classArr: ["container"],
    same: true,
  });

  const title = createDOM({
    kind: "h3",
    classArr: ["title"],
    text: "5 days Forecast",
  });

  const daysForecast = weather["forecast"];

  const daysContainer = createDOM({
    classArr: ["days-container"],
  });

  daysForecast.forEach((day) => {
    const container = createDOM({
      classArr: ["day-container"],
    });

    const iconD = createDOM({
      kind: "img",
      alt: day["icon"],
    });

    const tempD = createDOM({
      kind: "p",
    });
    tempD.dataset.id = "temp";
    tempD.dataset.rawTemp = day["temp"];

    const dateString = day["date"];

    const date = new Date(dateString);

    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const dateD = createDOM({
      kind: "p",
      classArr: ["date"],
      text: `${dayNum} ${monthName}`,
    });

    const dayNameD = createDOM({
      kind: "p",
      classArr: ["date"],
      text: dayName,
    });

    container.appendChild(iconD);
    container.appendChild(tempD);
    container.appendChild(dateD);
    container.appendChild(dayNameD);

    daysContainer.appendChild(container);
  });

  forecastContainer.appendChild(title);
  forecastContainer.appendChild(daysContainer);

  return forecastContainer;
}

// eslint-disable-next-line no-unused-vars
function createMapContainer(weather) {
  const mapContainer = createDOM({
    id: "map-container",
    classArr: ["container"],
    same: true,
  });

  const title = createDOM({
    kind: "h3",
    classArr: ["title"],
    text: "Weather Condition Map",
  });

  const content = createDOM({
    kind: "p",
    text: "Under construction...",
  });

  mapContainer.appendChild(title);
  mapContainer.appendChild(content);

  return mapContainer;
}

function renderContent() {
  const content = createDOM({
    id: "content",
    classArr: ["content", "wrapper"],
  });

  const cityWeather = appState.weatherDetails;

  if (!cityWeather) {
    const error = createDOM({
      kind: "p",
      classArr: ["error"],
      text: "Search for a city!",
    });

    content.appendChild(error);

    return content;
  }

  const condContainer = createCondContainer(cityWeather);
  const highlightContainer = createHighlightContainer(cityWeather);
  const forecastContainer = createForecastContainer(cityWeather);
  const mapContainer = createMapContainer(cityWeather);

  content.appendChild(condContainer);
  content.appendChild(highlightContainer);
  content.appendChild(forecastContainer);
  content.appendChild(mapContainer);

  return content;
}

export { renderContent };

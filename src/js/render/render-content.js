import { createDOM } from "./render-hub";
import { appState } from "../global/state";

function createCondContainer(weather) {
  const condContainer = createDOM({
    id: "condition-container",
    same: true,
  });

  const primaryDetails = createDOM();

  const icon = createDOM({
    kind: "img",
    classArr: ["icon"],
    alt: weather["icon"],
  });

  const temp = createDOM({
    id: "temp",
    same: true,
    text: weather["temperature"],
  });

  primaryDetails.appendChild(icon);
  primaryDetails.appendChild(temp);

  const condition = createDOM({
    classArr: ["conditions"],
    text: weather["conditions"],
  });

  const lineBreaker = createDOM({
    kind: "hr",
  });

  const cityName = createDOM({
    classArr: ["city-name"],
    text: weather["city-name"],
  });

  condContainer.appendChild(primaryDetails);
  condContainer.appendChild(condition);
  condContainer.appendChild(lineBreaker);
  condContainer.appendChild(cityName);

  return condContainer;
}

function createHighlightContainer(weather) {
  const hlContainer = createDOM({
    id: "high-container",
    same: true,
  });

  const features = ["Wind Status", "UV Index", "Sunrise & Sunset"];
  const datas = [
    weather["windspeed"],
    weather["uvindex"],
    "Under Construction...",
  ];

  features.forEach((feat, i) => {
    const container = createDOM();

    const title = createDOM({
      classArr: ["title"],
      text: feat,
    });

    const data = createDOM({
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
    same: true,
  });

  const title = createDOM({
    classArr: ["title"],
    text: "5 days Forecast",
  });

  const content = createDOM({
    text: "Under construction...",
  });

  forecastContainer.appendChild(title);
  forecastContainer.appendChild(content);

  return forecastContainer;
}

function createMapContainer(weather) {
  const mapContainer = createDOM({
    id: "map-container",
    same: true,
  });

  const title = createDOM({
    classArr: ["title"],
    text: "Weather Condition Map",
  });

  const content = createDOM({
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

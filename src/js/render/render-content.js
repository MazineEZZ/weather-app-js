import { appState } from "../global/state";
import { createDOM } from "../utils/dom-utils";
import clearDay from "../../assets/icons/clear-day.svg";
import clearNight from "../../assets/icons/clear-night.svg";
import rain from "../../assets/icons/rainy-2.svg";
import snow from "../../assets/icons/snowy-2.svg";
import sleet from "../../assets/icons/rain-and-sleet-mix.svg";
import wind from "../../assets/icons/wind.svg";
import fog from "../../assets/icons/fog.svg";
import cloudy from "../../assets/icons/cloudy.svg";
import partlyCloudyDay from "../../assets/icons/cloudy-2-day.svg";
import partlyCloudyNight from "../../assets/icons/cloudy-2-night.svg";
import hail from "../../assets/icons/hail.svg";
import thunder from "../../assets/icons/thunderstorms.svg";
import thunderRain from "../../assets/icons/severe-thunderstorm.svg";
import thunderShowersDay from "../../assets/icons/scattered-thunderstorms-day.svg";
import thunderShowersNight from "../../assets/icons/scattered-thunderstorms-night.svg";
import showersDay from "../../assets/icons/rainy-1-day.svg";
import showersNight from "../../assets/icons/rainy-1-night.svg";
import {
  capitalize,
  convertTo12Format,
  convertToSecs,
} from "../utils/utilities";
import { createElement, Sun } from "lucide";

const iconMap = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  rain: rain,
  snow: snow,
  sleet: sleet,
  wind: wind,
  fog: fog,
  cloudy: cloudy,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  hail: hail,
  thunder: thunder,
  "thunder-rain": thunderRain,
  "thunder-showers-day": thunderShowersDay,
  "thunder-showers-night": thunderShowersNight,
  "showers-day": showersDay,
  "showers-night": showersNight,
};

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
    src: iconMap[weather["icon"]] || iconMap["cloudy"],
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
    text: capitalize(weather["city-name"]),
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

  const title = createDOM({
    kind: "h3",
    classArr: ["title"],
    text: "Today's Highlight",
  });

  const scales = [
    ["0", "40 km/h"],
    ["0", "12 uv"],
    [
      convertTo12Format(weather["sunrise"]),
      convertTo12Format(weather["sunset"]),
    ],
  ];
  const maxValues = [40, 12, convertToSecs(weather["sunset"])];
  const minValues = [0, 0, convertToSecs(weather["sunrise"])];
  const featColor = ["#378add", "#f5a623", "#f5a623"];
  const features = ["Wind Status", "UV Index", "Sunrise & Sunset"];
  const datas = [weather["windspeed"], weather["uvindex"], weather["time"]];
  const dataUnits = [
    "km/h",
    "uv",
    convertTo12Format(weather["time"]).split(" ")[1],
  ];

  const featuresContainer = createDOM({
    classArr: ["features-container"],
  });

  features.forEach((feat, i) => {
    const container = createDOM({
      classArr: ["subcontainer"],
    });

    const title = createDOM({
      kind: "p",
      classArr: ["title"],
      text: feat,
    });

    const gaugeContainer = createDOM({
      classArr: ["gauge-container"],
    });

    const circleHider = createDOM({
      classArr: ["circle"],
    });

    const gauge = createDOM({
      classArr: ["gauge"],
    });
    let value = datas[i];
    let percentage;
    if (i == 2) {
      const sunrise = minValues[2];
      const sunset = maxValues[2];
      const nowSecs = convertToSecs(value);

      gauge.classList.add("suntime");
      circleHider.classList.add("suntime");

      percentage = Math.max(
        0,
        Math.min(1, (nowSecs - sunrise) / (sunset - sunrise)),
      );
      gauge.style.setProperty("--percent", (percentage / 2) * 100 + "%");
      gauge.style.setProperty("--clr-gauge", featColor[i]);

      const marker = createDOM({
        classArr: ["sky-marker"],
      });
      const markerIcon = createElement(Sun);
      marker.appendChild(markerIcon);
      marker.style.color = featColor[2];

      const angleDeg = -90 + percentage * 180;
      marker.style.transform = `rotate(${angleDeg}deg) translateY(-90px) rotate(${-angleDeg}deg)`;

      gaugeContainer.appendChild(gauge);
      gaugeContainer.appendChild(marker);
    } else {
      percentage = (value - minValues[i]) / maxValues[i];
      gauge.style.setProperty("--percent", (percentage / 2) * 100 + "%");
      gauge.style.setProperty("--clr-gauge", featColor[i]);
    }

    const scaleContainer = createDOM({
      classArr: ["scale"],
    });

    scales[i].forEach((scale) => {
      const scaleD = createDOM({
        kind: "span",
        text: scale,
      });

      scaleContainer.appendChild(scaleD);
    });

    const subcontainer = createDOM({
      classArr: ["bottom-container"],
    });
    if (i == 2) {
      datas[i] = convertTo12Format(datas[i]).split(" ")[0];
    }
    const data = createDOM({
      kind: "p",
      classArr: ["data"],
      text: String(datas[i]),
    });

    const dataUnit = createDOM({
      kind: "p",
      classArr: ["unit"],
      text: dataUnits[i],
    });

    gaugeContainer.appendChild(circleHider);
    gaugeContainer.appendChild(gauge);

    subcontainer.appendChild(data);
    subcontainer.appendChild(dataUnit);

    container.appendChild(title);
    container.appendChild(gaugeContainer);
    container.appendChild(scaleContainer);
    container.appendChild(subcontainer);

    featuresContainer.appendChild(container);
  });

  hlContainer.appendChild(title);
  hlContainer.appendChild(featuresContainer);

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
      classArr: ["icon"],
      src: iconMap[day["icon"]] || iconMap["cloudy"],
      alt: day["icon"],
    });

    const tempD = createDOM({
      kind: "p",
      classArr: ["temp"],
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

  const lat = weather["lat"];
  const lon = weather["lon"];
  const url = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=600&height=400&zoom=8&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=true`;
  const map = createDOM({
    kind: "iframe",
    src: url,
  });
  map.loading = "lazy";

  mapContainer.appendChild(title);
  mapContainer.appendChild(map);

  return mapContainer;
}

function renderContent() {
  const content = createDOM({
    id: "content",
    classArr: ["content", "wrapper"],
  });

  if (appState.error) {
    const error = createDOM({
      kind: "p",
      classArr: ["error"],
      text: appState.error,
    });

    content.appendChild(error);

    return content;
  }

  const cityWeather = appState.weatherDetails;

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

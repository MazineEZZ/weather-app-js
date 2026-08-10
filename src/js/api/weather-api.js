import { VS_API_KEY } from "../global/env";

async function fetchWeatherCoords(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${VS_API_KEY}`,
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP Error! Status ${response.status}`);
  }

  return await response.json();
}

export { fetchWeatherCoords };

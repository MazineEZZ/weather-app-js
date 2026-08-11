# Wheteo — Weather App

A weather app built as part of [The Odin Project](https://www.theodinproject.com/) curriculum, using vanilla JavaScript and Webpack. Here's a [live preview](https://mazineezz.github.io/weather-app-js/)

## Features

- Search current weather by city
- °C / °F toggle
- Animated gauges for wind status, UV index, and sunrise/sunset
- 5-day forecast
- Embedded interactive weather map (via Windy)

## Tech

- Vanilla JavaScript (ES modules)
- Webpack
- CSS custom properties for theming
- [Visual Crossing Weather API](https://www.visualcrossing.com/) for weather data
- [Windy API](https://www.windy.com/) for the embedded map
- [Lucide](https://lucide.dev/) for icons

## Setup

```bash
npm install
npm run start
```

Add your own Visual Crossing API key in `src/global/env.js`.

## Notes

Built in 3 days as a learning project. Error handling is minimal and to the point by design, the focus was on layout, state management, and the custom gauge component.

function round(num, digits) {
  return Math.round(num * 10 * digits) / (10 * digits);
}

function convertToFahrenheit(temp) {
  return round((temp * 9) / 5 + 32, 2);
}

function convertToCelsius(temp) {
  return round(((temp - 32) * 5) / 9, 2);
}

function capitalize(word) {
  return (
    word[0].toUpperCase() + word.split("").splice(1).join("").toLowerCase()
  );
}

export { convertToCelsius, convertToFahrenheit, capitalize };

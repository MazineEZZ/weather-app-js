function round(num, digits) {
  return Math.floor(num * 10 ** digits) / 10 ** digits;
}

function convertToFahrenheit(temp) {
  return (parseInt(temp) * 9) / 5 + 32;
}

function convertToCelsius(temp) {
  return (parseInt(temp) - 32) * (5 / 9);
}

function capitalize(sentence) {
  return sentence
    .split(" ")
    .map(
      (word) =>
        word[0].toUpperCase() + word.split("").splice(1).join("").toLowerCase(),
    )
    .join(" ");
}

export { convertToCelsius, convertToFahrenheit, capitalize, round };

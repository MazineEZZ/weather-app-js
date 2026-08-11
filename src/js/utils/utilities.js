function round(num, digits) {
  return Math.floor(num * 10 ** digits) / 10 ** digits;
}

function convertToFahrenheit(temp) {
  return (parseFloat(temp) * 9) / 5 + 32;
}

function convertToCelsius(temp) {
  return (parseFloat(temp) - 32) * (5 / 9);
}

function convertToSecs(time) {
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];
  const seconds = hours * 3600 + minutes * 60;
  return seconds;
}

function convertTo12Format(time24) {
  const dateObj = new Date(`2007-01-09T${time24}`);

  const time12 = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return time12;
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

export {
  convertToCelsius,
  convertToFahrenheit,
  capitalize,
  round,
  convertToSecs,
  convertTo12Format,
};

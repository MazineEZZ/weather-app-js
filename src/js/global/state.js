import { convertToCelsius } from "../utils/utilities";

const appState = {
  tempUnit: "C",
  convertTemp(temp) {
    if (this.tempUnit === "C") return convertToCelsius(temp);
    return temp;
  },
  // appWrapper,
  // searchBar,
  // weatherDetails,
};

export { appState };

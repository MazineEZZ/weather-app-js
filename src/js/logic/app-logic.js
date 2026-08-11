import { setUpEventListeners } from "../events/event-listener";
import { appState } from "../global/state";
import {
  renderAppWrapper,
  renderContent,
  renderNavbar,
} from "../render/render-hub";
import { round } from "../utils/utilities";

function updateTemp() {
  const tempBoxes = document.querySelectorAll('[data-id="temp"]');
  const toggleBtn = document.querySelector("#toggle-temp");
  toggleBtn.textContent = "°" + appState.tempUnit;

  tempBoxes.forEach((tempBox) => {
    const tempValue = appState.convertTemp(tempBox.dataset.rawTemp);
    tempBox.textContent = round(tempValue, 1) + "°" + appState.tempUnit;
  });
}

function refreshPage() {
  const appWrapper = appState.appWrapper;
  appWrapper.replaceChildren();

  const navbar = renderNavbar();
  const content = renderContent();

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(content);

  updateTemp();
}

function initApp() {
  const appWrapper = renderAppWrapper();

  // App State
  appState.appWrapper = appWrapper;
  appState.error = "Search for a city!";

  const navbar = renderNavbar();
  const content = renderContent();

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(content);

  setUpEventListeners();

  document.body.appendChild(appWrapper);
}

export { initApp, refreshPage, updateTemp };

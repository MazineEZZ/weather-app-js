import { setUpEventListeners } from "../events/event-listener";
import { appState } from "../global/state";
import {
  renderAppWrapper,
  renderContent,
  renderNavbar,
} from "../render/render-hub";
import { convertToCelsius } from "../utils/utilities";

function refreshPage() {
  const appWrapper = appState.appWrapper;
  appWrapper.replaceChildren();

  const navbar = renderNavbar();
  const content = renderContent();

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(content);
}

function initApp() {
  const appWrapper = renderAppWrapper();

  const navbar = renderNavbar();
  const content = renderContent();

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(content);

  // App State
  appState.appWrapper = appWrapper;
  appState.convertTemp = (temp) => convertToCelsius(temp);

  setUpEventListeners();

  document.body.appendChild(appWrapper);
}

export { initApp, refreshPage };

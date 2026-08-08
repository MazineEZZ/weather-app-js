import {
  renderNavbar,
  renderContent,
  renderAppWrapper,
} from "../render/render";

function initApp() {
  const appWrapper = renderAppWrapper();

  const navbar = renderNavbar();
  const content = renderContent();

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(content);

  document.body.appendChild(appWrapper);
}

export { initApp };

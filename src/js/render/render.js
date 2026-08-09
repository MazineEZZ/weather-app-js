import { appState } from "../global/state";
import { capitalize } from "../utils/utilities";

function createDOM({
  kind = "div",
  id = "",
  name = "",
  classArr = [],
  type = "",
  text = "",
  placeholder,
} = {}) {
  const element = document.createElement(kind);

  if (id) element.id = id;
  if (type) element.type = type;
  if (name) element.classList.add(name);
  if (text) element.textContent = text;
  if (placeholder) element.placeholder = placeholder;
  classArr.forEach((cls) => element.classList.add(cls));

  return element;
}

function renderAppWrapper() {
  const appWrapper = createDOM({
    id: "app-wrapper",
    classArr: ["wrapper"],
  });

  return appWrapper;
}

function renderNavbar() {
  const navbar = createDOM({
    id: "navbar",
    classArr: ["navbar", "header"],
  });

  const logo = createDOM({
    kind: "img",
    id: "logo",
    name: "logo",
    text: "LOGO",
  });

  const container = createDOM({
    name: "container",
  });

  const toggleTemp = createDOM({
    kind: "button",
    id: "toggle-temp",
    classArr: ["toggle-temp-btn", "toggler"],
    text: "toggle",
  });

  const searchBar = createDOM({
    kind: "input",
    type: "search",
    id: "search-bar",
    placeholder: "Search for a city's weather...",
  });

  const searchBtn = createDOM({
    kind: "button",
    id: "search-btn",
    text: "🔍",
  });

  appState.searchBar = searchBar;

  container.appendChild(toggleTemp);
  container.appendChild(searchBar);
  container.appendChild(searchBtn);

  navbar.appendChild(logo);
  navbar.appendChild(container);

  return navbar;
}

function renderContent() {
  const content = createDOM({
    id: "content",
    classArr: ["content", "wrapper"],
  });

  const cityWeather = appState.weatherDetails;

  if (!cityWeather) {
    const error = createDOM({
      name: "error",
      text: "Search for a city!",
    });

    content.appendChild(error);

    return content;
  }

  for (const prop in cityWeather) {
    const container = createDOM();

    const text = createDOM({
      classArr: [`city-${prop}`, `text`],
      text: capitalize(prop.split("-").join(" ")),
    });

    const value = createDOM({
      classArr: [`city-${prop}`, "value"],
      text: cityWeather[prop],
    });

    container.appendChild(text);
    container.appendChild(value);

    content.appendChild(container);
  }

  return content;
}

export { renderNavbar, renderContent, renderAppWrapper };

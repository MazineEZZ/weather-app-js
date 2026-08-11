import { appState } from "../global/state";
import { createDOM } from "../utils/dom-utils";
import { createElement, Search, Sun } from "lucide";

function renderNavbar() {
  const navbar = createDOM({
    id: "navbar",
    classArr: ["navbar", "header"],
  });

  const logo = createDOM({
    kind: "h1",
    id: "logo",
    same: true,
    text: "Wheteo",
  });
  logo.appendChild(createElement(Sun));

  const container = createDOM({
    classArr: ["container"],
  });

  const toggleTemp = createDOM({
    kind: "button",
    id: "toggle-temp",
    classArr: ["toggle-temp-btn", "toggler"],
    text: "°" + appState.tempUnit,
  });

  const searchBar = createDOM({
    kind: "input",
    type: "search",
    id: "search-bar",
    same: true,
    placeholder: "Search for a city's weather...",
  });

  const searchBtn = createDOM({
    kind: "button",
    id: "search-btn",
  });
  searchBtn.appendChild(createElement(Search));

  appState.searchBar = searchBar;

  container.appendChild(toggleTemp);
  container.appendChild(searchBar);
  container.appendChild(searchBtn);

  navbar.appendChild(logo);
  navbar.appendChild(container);

  return navbar;
}

export { renderNavbar };

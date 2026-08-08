function createDOM({
  kind = "div",
  id = "",
  name = "",
  classArr = [],
  type = "",
  text = "",
} = {}) {
  const element = document.createElement(kind);

  if (id) element.id = id;
  if (type) element.type = type;
  if (name) element.classList.add(name);
  if (text) element.textContent = text;
  if (classArr !== []) classArr.forEach((cls) => element.classList.add(cls));

  return element;
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
  });

  const container = createDOM({
    name: "container",
  });

  const toggleTemp = createDOM({
    kind: "button",
    id: "toggle-temp",
    classArr: ["toggle-temp-btn", "toggler"],
  });

  const searchBar = createDOM({
    kind: "input",
    type: "search",
    id: "search-bar",
  });

  container.appendChild(toggleTemp);
  container.appendChild(searchBar);

  navbar.appendChild(logo);
  navbar.appendChild(container);

  return navbar;
}

function renderContent() {
  const content = createDOM({
    id: "content",
    classArr: ["content", "wrapper"],
  });

  return content;
}

export { renderNavbar, renderContent };

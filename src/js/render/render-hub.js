function createDOM({
  kind = "div",
  id = "",
  classArr = [],
  type = "",
  text = "",
  placeholder = "",
  alt = "",
  same = false,
} = {}) {
  const element = document.createElement(kind);

  if (id) element.id = id;
  if (same && id) element.classList.add(id);
  if (type) element.type = type;
  if (alt) element.alt = alt;
  if (text) element.textContent = text;
  if (placeholder) element.placeholder = placeholder;
  classArr.forEach((cls) => element.classList.add(cls));

  return element;
}

function renderAppWrapper() {
  const appWrapper = createDOM({
    id: "app-wrapper",
    same: true,
  });

  return appWrapper;
}

export { createDOM, renderAppWrapper };

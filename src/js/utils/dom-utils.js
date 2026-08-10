function createDOM({
  kind = "div",
  id = "",
  classArr = [],
  type = "",
  text = "",
  placeholder = "",
  alt = "",
  src = "",
  same = false,
} = {}) {
  const element = document.createElement(kind);

  if (id) element.id = id;
  if (same && id) element.classList.add(id);
  if (type) element.type = type;
  if (alt) element.alt = alt;
  if (src) element.src = src;
  if (text) element.textContent = text;
  if (placeholder) element.placeholder = placeholder;
  classArr.forEach((cls) => element.classList.add(cls));

  return element;
}

export { createDOM };

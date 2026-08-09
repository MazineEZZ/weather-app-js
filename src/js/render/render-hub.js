import { renderContent } from "./render-content";
import { renderNavbar } from "./render-navbar";
import { createDOM } from "../utils/dom-utils";

function renderAppWrapper() {
  const appWrapper = createDOM({
    id: "app-wrapper",
    same: true,
  });

  return appWrapper;
}

export { renderAppWrapper, renderContent, renderNavbar };

import { globalEventListener } from "./views/searchContainer";

const global = {
  currentPage: window.location.pathname,
};

// Init App
export function init() {
  globalEventListener();
}

document.addEventListener("DOMContentLoaded", init);

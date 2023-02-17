import { recipes } from "./data/recipes.js";
import { displayResultsContainer } from "./views/resultsContainer.js";
import { displaySearchContainer } from "./views/searchContainer.js";

const global = {
  currentPage: window.location.pathname,
};

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySearchContainer(recipes);
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);

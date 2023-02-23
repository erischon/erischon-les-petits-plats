import { setLocalStorage } from "./controllers/utils";
import { globalEventListener } from "./views/searchContainer";
import { recipes } from "./data/recipes";
import { DisplayResultsContainer } from "./views/resultsContainer";
import { getRecipesList } from "./controllers/utils";

const global = {
  currentPage: window.location.pathname,
  recipesList: setLocalStorage(recipes),
};

// const results = new DisplayResultsContainer(getRecipesList("recipesList"));

// Init App
export function init() {
  globalEventListener();
  // display tags
  // display results
}

document.addEventListener("DOMContentLoaded", init);

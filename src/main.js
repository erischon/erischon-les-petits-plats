import { setLocalStorage } from "./controllers/utils";
import { globalEventListener } from "./views/searchContainer";
import { recipes } from "./data/recipes";
import { DisplayResultsContainer } from "./views/resultsContainer";
import { getRecipesList } from "./controllers/utils";

const global = {
  currentPage: window.location.pathname,
};

const recipesList = setLocalStorage(recipes);
const results = new DisplayResultsContainer(
  getRecipesList("actualizedRecipesList")
);

// Init App
export function init() {
  globalEventListener();
}

document.addEventListener("DOMContentLoaded", init);

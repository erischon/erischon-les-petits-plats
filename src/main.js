import { setLocalStorage } from "./controllers/utils";
import { globalEventListener } from "./views/searchContainer";
import { recipes } from "./data/recipes";
import { DisplayResultsContainer } from "./views/resultsContainer";
import { getRecipesList } from "./controllers/utils";

const global = {
  currentPage: window.location.pathname,
};

const recipesList = setLocalStorage(recipes);

function observer() {
  if (getRecipesList(recipesList) != getRecipesList("actualizedRecipesList")) {
    const results = new DisplayResultsContainer(
      getRecipesList("actualizedRecipesList")
    );
  }
}

// Init App
export function init() {
  globalEventListener();
}

observer();
document.addEventListener("DOMContentLoaded", init);

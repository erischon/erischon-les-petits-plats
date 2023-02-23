import { setLocalStorage } from "./controllers/utils";

import { recipes } from "./data/recipes";
import { DisplayResultsContainer } from "./views/resultsContainer";
import { getRecipesList } from "./controllers/utils";
import { getUpdatedRecipeList } from "./controllers/globalSearch";

import { state, globalSearch } from "./model";
import resultsView from "./views/resultsView";

const global = {
  currentPage: window.location.pathname,
  recipesList: setLocalStorage(recipes),
};

// const results = new DisplayResultsContainer(getRecipesList("recipesList"));

// Init App
export function init() {
  controlResult();
  globalEventListener();
  // display tags
  // display results
}

async function controlResult() {
  try {
    if (Object.keys(state.recipes).length === 0) return;

    resultsView.render(state.recipes);
  } catch (err) {
    console.error(`🛑⚡\nError controlResult()\n${err}\n ⚡🛑`);
  }
}

function globalEventListener() {
  const globalInput = document.querySelector(".search-container__input");

  globalInput.addEventListener("input", (e) => {
    globalSearch(e);
  });
}

document.addEventListener("DOMContentLoaded", init);

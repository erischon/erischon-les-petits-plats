import { getUpdatedRecipeList } from "../controllers/_globalSearch";
import { getRecipesList } from "../controllers/_utils";
import { DisplayResultsContainer } from "./_resultsContainer";
import { recipes } from "../data/recipes";
import { state } from "../model";

const MIN_QUERY_LENGTH = 3;
localStorage.setItem("actualizedRecipesList", []);

/**
 * Add an Event Listener to Search Box
 */
export function globalEventListener() {
  const globalInput = document.querySelector(".search-container__input");

  globalInput.addEventListener("input", (e) => {
    if (e.target.value.length <= 2) {
      const resultContainer = new DisplayResultsContainer();
      resultContainer.eraseCards();
    }

    globalSearch(e);
  });
}

/**
 * Do a global Search
 */
export function globalSearch(e) {
  if (e.target.value.length >= MIN_QUERY_LENGTH) {
    const resp = getUpdatedRecipeList(e.target.value, state.recipes);

    return resp;
  }
}

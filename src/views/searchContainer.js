import { getUpdatedRecipeList } from "../controllers/globalSearch";
import { getRecipesList } from "../controllers/utils";

const MIN_QUERY_LENGTH = 3;

/**
 * Add an Event Listener to Search Box
 */
export function globalEventListener() {
  const globalInput = document.querySelector(".search-container__input");

  globalInput.addEventListener("input", (e) => {
    localStorage.setItem(
      "actualizedRecipesList",
      JSON.stringify(globalSearch(e))
    );
  });
}

/**
 * Do a global Search
 */
export function globalSearch(e) {
  if (e.target.value.length >= MIN_QUERY_LENGTH) {
    const resp = getUpdatedRecipeList(
      e.target.value,
      getRecipesList("recipesList")
    );

    return resp;
  }
}

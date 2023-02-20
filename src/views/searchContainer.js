import { getUpdatedRecipeList } from "../controllers/globalSearch";
import { getRecipesList } from "../controllers/utils";
import { DisplayResultsContainer } from "./resultsContainer";
import { recipes } from "../data/recipes";

const MIN_QUERY_LENGTH = 3;
localStorage.setItem("actualizedRecipesList", []);

/**
 * Add an Event Listener to Search Box
 */
export function globalEventListener() {
  const globalInput = document.querySelector(".search-container__input");

  globalInput.addEventListener("input", (e) => {
    globalSearch(e);
    // localStorage.setItem(
    //   "actualizedRecipesList",
    //   JSON.stringify(globalSearch(e))
    // );

    // const result = getRecipesList("actualizedRecipesList");

    // if (result.length > 0) {
    //   console.log(result);
    //   new DisplayResultsContainer(getRecipesList("actualizedRecipesList"));
    // }
  });
}

/**
 * Do a global Search
 */
export function globalSearch(e) {
  if (e.target.value.length >= MIN_QUERY_LENGTH) {
    const resp = getUpdatedRecipeList(e.target.value, recipes);

    return resp;
  }
}

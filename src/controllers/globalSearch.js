import { DisplayResultsContainer } from "../views/resultsContainer";
import { getRecipesList } from "./utils";

/**
 * Get an updated list of recipe in relation to a search term
 * @param searchTerms
 * @param recipes
 * @returns
 */
export function getUpdatedRecipeList(searchTerms, recipes) {
  let updatedRecipeList = [];
  let resp = new DisplayResultsContainer();

  const searchWords = new RegExp(searchTerms, "gi");

  recipes.map((recipe) => {
    if (
      searchWords.test(recipe.name) ||
      searchWords.test(recipe.description) ||
      searchWords.test(recipe.ingredients.map((item) => item.ingredient))
    ) {
      updatedRecipeList.push(recipe);
    }
  });

  resp.getCards(updatedRecipeList);
  console.log(resp);

  console.log("======globalSearchResult", updatedRecipeList);

  return updatedRecipeList;
}

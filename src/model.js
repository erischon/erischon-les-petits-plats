import { recipes } from "./data/recipes";
import { getUpdatedRecipeList } from "./controllers/globalSearch";

export const state = {
  recipes: recipes,
};

console.log("======state.recipes", state.recipes);

export async function loadRecipes() {
  try {
  } catch (err) {
    console.error(err);
  }
}

export function search(searchTerms, recipes) {
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

  console.log("======globalSearchResult", updatedRecipeList);

  return updatedRecipeList;
}

export function globalSearch(e) {
  if (e.target.value.length >= 3) {
    return (state.recipes = getUpdatedRecipeList(
      e.target.value,
      state.recipes
    ));
  }
}

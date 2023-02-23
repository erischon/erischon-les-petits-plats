import { recipes } from "./data/recipes";

export const state = {
  recipes: recipes,
};

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

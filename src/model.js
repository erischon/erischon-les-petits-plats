import { getUpdatedRecipeList } from "./controllers/globalSearch";
import { recipes } from "./data/recipes";

import { getJSON } from "./helpers";

export const state = {
  recipes: recipes,
  search: {
    query: "",
    results: [],
  },
};

console.log("======state.recipes", state.recipes);

function createQuery(searchTerms) {
  const query = new RegExp(searchTerms, "gi");

  return query;
}

function searchRecipe(query, recipes) {
  let updatedRecipeList = [];

  recipes.map((recipe) => {
    if (
      query.test(recipe.name) ||
      query.test(recipe.description) ||
      query.test(recipe.ingredients.map((item) => item.ingredient))
    ) {
      updatedRecipeList.push(recipe);
    }
  });

  return updatedRecipeList;
}

export async function loadSearchResults(searchTerms) {
  try {
    state.search.query = createQuery(searchTerms);
    const data = await getJSON();

    const results = searchRecipe(state.search.query, data);

    state.search.results = results;
  } catch (err) {
    console.error(err);
  }
}

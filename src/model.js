import { getJSON } from "./helpers";

export const state = {
  recipes: {},
  search: {
    query: "",
    results: [],
  },
};

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

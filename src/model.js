import { getJSON } from "./helpers";
import tagsBoxView from "./views/tagsBoxView";

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

async function getRecipes() {
  state.recipes = await getJSON();
}

export async function loadSearchResults(searchTerms) {
  try {
    state.search.query = createQuery(searchTerms);

    const results = searchRecipe(state.search.query, state.recipes);

    proxySearch.results = results;
  } catch (err) {
    console.error(err);
  }
}

let handlerProxySearch = {
  set: function (obj, prop, value) {
    obj[prop] = value;

    if (prop === "results") {
      tagsBoxView.generateNewList(obj[prop]);
    }

    return true;
  },
};

let proxySearch = new Proxy(state.search, handlerProxySearch);

// init recipes
getRecipes();

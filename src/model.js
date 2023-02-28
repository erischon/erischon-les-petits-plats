import { getJSON } from "./helpers";

import resultsView from "./views/resultsView";

import { ResultsByTagsFactory } from "./factory";

export const state = {
  recipes: {},
  search: {
    query: "",
    results: [],
  },
  activeTagsBox: "",
};

export function getActiveTagsBox() {
  const openTagsBoxEl = document.querySelector(".active");
  if (!openTagsBoxEl) return;

  proxyTagsBox.activeTagsBox = openTagsBoxEl.id;
}

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

function searchRecipeByTag(query, recipes) {
  let updatedRecipeList = [];

  recipes.map((recipe) => {
    if (query.test(recipe.ingredients.map((item) => item.ingredient))) {
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
    state.search.query = searchTerms;

    if (state.search.query.length < 3) {
      proxySearch.results = [];
      return;
    }

    const results = searchRecipe(
      createQuery(state.search.query),
      state.recipes
    );

    proxySearch.results = results;
  } catch (err) {
    console.error(err);
  }
}

export async function loadSearchResultsByTag(searchTerms) {
  try {
    const query = searchTerms;

    if (query.length < 3) {
      proxySearch.results = [];
      return;
    }

    const results = searchRecipeByTag(createQuery(query), state.recipes);

    proxySearch.results = results;
  } catch (err) {
    console.error(err);
  }
}

let handlerProxySearch = {
  set: function (obj, prop, value) {
    obj[prop] = value;

    if (prop === "results") {
      resultsView.render(obj[prop]);
    }

    if (prop === "activeTagsBox") {
      // resultsByTagView.render(obj[prop], state.activeTagsBox);
    }

    return true;
  },
};

let proxySearch = new Proxy(state.search, handlerProxySearch);
let proxyTagsBox = new Proxy(state, handlerProxySearch);

// init recipes
getRecipes();

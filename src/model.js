import { getJSON } from "./helpers";

import resultsView from "./views/resultsView";

/**
 * States of the App
 */
export const state = {
  recipes: {},
  search: {
    terms: {
      global: "",
      ingredients: "",
      appliances: "",
      utensils: "",
    },
    results: [],
  },
  activeTagsBox: "",
};

/**
 * Finding the active box and set the state with it
 */
export function getActiveTagsBox() {
  const openTagsBoxEl = document.querySelector(".active");
  if (!openTagsBoxEl) return;

  proxyTagsBox.activeTagsBox = openTagsBoxEl.id;
}

/**
 * Create a query
 */
function createQuery(searchTerms) {
  const query = new RegExp(searchTerms, "gi");

  return query;
}

/**
 *
 */
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

/**
 *
 */
function searchRecipeByTag(query, recipes) {
  let updatedRecipeList = [];

  if (state.activeTagsBox === "ingredients") {
    recipes.map((recipe) => {
      if (query.test(recipe.ingredients.map((item) => item.ingredient))) {
        updatedRecipeList.push(recipe);
      }
    });

    return updatedRecipeList;
  } else if (state.activeTagsBox === "appliances") {
    recipes.map((recipe) => {
      if (query.test(recipe.appliance)) {
        updatedRecipeList.push(recipe);
      }
    });

    return updatedRecipeList;
  } else if (state.activeTagsBox === "utensils") {
    recipes.map((recipe) => {
      if (query.test(recipe.ustensils.map((utensil) => utensil))) {
        updatedRecipeList.push(recipe);
      }
    });

    return updatedRecipeList;
  }
}

/**
 * Get the original array of recipes
 */
async function getRecipes() {
  state.recipes = await getJSON();
}

/**
 *
 */
export async function loadSearchResults(searchTerms) {
  try {
    proxyTerms.global = searchTerms;

    if (proxyTerms.global.length < 3) {
      proxySearch.results = [];
      return;
    }

    const results = searchRecipe(createQuery(proxyTerms.global), state.recipes);

    proxySearch.results = results;
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 */
export async function loadSearchResultsByTag(searchTerms) {
  try {
    const query = searchTerms;
    const type = state.activeTagsBox;
    proxyTerms[state.activeTagsBox] = query;

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

// Move to controller
let handlerProxySearch = {
  set: function (obj, prop, value) {
    obj[prop] = value;

    if (prop === "results") {
      resultsView.render(obj[prop]);
    }

    if (prop === "activeTagsBox") {
      // resultsByTagView.render(obj[prop], state.activeTagsBox);
      console.log(`======l'active box ${prop} a changé`);
    }

    if (
      prop === "global" ||
      prop === "ingredients" ||
      prop === "appliances" ||
      prop === "utensils"
    ) {
      console.log(`======la query ${prop} a changé`);
    }

    return true;
  },
};

let proxySearch = new Proxy(state.search, handlerProxySearch);
let proxyTagsBox = new Proxy(state, handlerProxySearch);
let proxyTerms = new Proxy(state.search.terms, handlerProxySearch);

// init recipes
getRecipes();

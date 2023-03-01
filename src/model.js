import { getJSON } from "./helpers";

import resultsView from "./views/resultsView";

import { ResultsByTagsFactory } from "./factory";

export const state = {
  recipes: {},
  search: {
    queries: {
      global: "",
      ingredients: "",
      appliances: "",
      utensils: "",
    },
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

async function getRecipes() {
  state.recipes = await getJSON();
}

export async function loadSearchResults(searchTerms) {
  try {
    proxyQueries.global = searchTerms;

    if (proxyQueries.global.length < 3) {
      proxySearch.results = [];
      return;
    }

    const results = searchRecipe(
      createQuery(proxyQueries.global),
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
    const type = state.activeTagsBox;
    proxyQueries[state.activeTagsBox] = query;

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
    console.log("======prop", prop);
    if (prop === "results") {
      resultsView.render(obj[prop]);
    }

    if (prop === "activeTagsBox") {
      // resultsByTagView.render(obj[prop], state.activeTagsBox);
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
let proxyQueries = new Proxy(state.search.queries, handlerProxySearch);

// init recipes
getRecipes();

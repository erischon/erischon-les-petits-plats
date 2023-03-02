import { getJSON } from "./helpers";
import { appProxy } from "./controller";

/**
 * States of the App
 */
export const state = {
  recipes: {},
  tags: {},
  search: {
    terms: {
      global: "",
      ingredients: "",
      appliances: "",
      utensils: "",
    },
    results: [],
    tagsResults: {},
  },
  searchTag: {
    terms: {
      ingredients: "",
      appliances: "",
      utensils: "",
    },
    results: {
      ingredients: [],
      appliances: [],
      utensils: [],
    },
  },
  activeTagsBox: "",
};

/**
 * Finding the active box and set the state with it
 */
export function getActiveTagsBox() {
  const openTagsBoxEl = document.querySelector(".active");
  if (!openTagsBoxEl) return;

  appProxy.tagsBox.activeTagsBox = openTagsBoxEl.id;
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
function searchTag(query, tags) {
  let updatedTagsList = [];

  tags[state.activeTagsBox].map((tag) => {
    if (query.test(tag)) {
      updatedTagsList.push(tag);
    }
  });

  return updatedTagsList;
}

/**
 *
 */
export function getTagsResults(results) {
  let ingredientsTags = [
    ...new Set(
      results.map((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
    ),
  ];
  ingredientsTags = [...new Set(ingredientsTags.flat(1))];

  let appliancesTags = [...new Set(results.map((recipe) => recipe.appliance))];

  let utensilsTags = [...new Set(results.map((recipe) => recipe.ustensils))];
  utensilsTags = [...new Set(utensilsTags.flat(1))];

  return {
    ingredients: ingredientsTags,
    appliances: appliancesTags,
    utensils: utensilsTags,
  };
}

/**
 *
 */
export function loadSearchResults(searchTerms) {
  try {
    if (appProxy.terms.global.length < 3) {
      appProxy.search.results = [];
      return;
    }

    const results = searchRecipe(
      createQuery(appProxy.terms.global),
      state.recipes
    );

    appProxy.search.results = results;
    appProxy.search.tagsResults = getTagsResults(state.search.results);
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 */
export function loadSearchResultsByTag(searchTerms) {
  try {
    const results = searchTag(
      createQuery(searchTerms),
      state.search.tagsResults
    );

    appProxy.search.tagsResults[state.activeTagsBox] = results;

    // mettre à jour les autres keys :
    // 1/ rechercher dans toutes les recipes par type
    // 2/ getTagsResult pour type manquant A
    // 3/ update
    // 3/ getTagsResult pour type manquant B
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get the original array of recipes
 */
async function initStates() {
  state.recipes = await getJSON();
  state.tags = getTagsResults(state.recipes);
  state.search.tagsResults = state.tags;
}

// init recipes
initStates();

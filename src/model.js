import { getJSON } from "./helpers";
import { appProxy } from "./controller";

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
    tagsResults: {},
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
async function initStates() {
  state.recipes = await getJSON();

  createTagsResults(state.recipes);
}

/**
 *
 */
function createTagsResults(results) {
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

  state.search.tagsResults = {
    ingredients: ingredientsTags,
    appliances: appliancesTags,
    utensils: utensilsTags,
  };
}

/**
 *
 */
export async function loadSearchResults(searchTerms) {
  try {
    appProxy.terms.global = searchTerms;

    if (appProxy.terms.global.length < 3) {
      appProxy.search.results = [];
      return;
    }

    const results = searchRecipe(
      createQuery(appProxy.terms.global),
      state.recipes
    );

    appProxy.search.results = results;
    createTagsResults(results);

    console.log("======tagsResults", state.search.tagsResults);
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
    appProxy.terms[state.activeTagsBox] = query;

    if (query.length < 3) {
      appProxy.search.results = [];
      return;
    }

    const results = searchRecipeByTag(createQuery(query), state.recipes);

    appProxy.search.results = results;
  } catch (err) {
    console.error(err);
  }
}

// init recipes
initStates();

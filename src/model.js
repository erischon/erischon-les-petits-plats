import { getJSON } from "./helpers";

import { Event, PropertyChangedArgs } from "./observer";

class State {
  constructor() {
    this.valueChanged = new Event();
    this.states = {
      recipes: {},
      tags: {},
      searchRecipe: {
        terms: "",
        recipeResults: [],
        tagsResults: {},
      },
      searchTag: {
        terms: {
          ingredients: "",
          appliances: "",
          utensils: "",
        },
        tagResults: {
          ingredients: [],
          appliances: [],
          utensils: [],
        },
        selectedTags: [],
      },
      activeTagsBox: "",
    };
  }

  set(state, value) {
    switch (state) {
      case "selectedTag":
        this.states.searchTag.selectedTags.push(value);
        break;
      case "recipeResult":
        this.states.searchRecipe.recipeResults = value;
        break;
      case "tagsResult":
        this.states.searchRecipe.tagsResults = value;
        break;
      case "activeTagsBox":
        this.states.activeTagsBox = value;
        break;
      case "terms":
        this.states.searchRecipe.terms = value;
        break;
      default:
        break;
    }

    this.valueChanged.fire(this, new PropertyChangedArgs(state, value));
  }
}

export const states = new State();

/**
 * States of the App
 */
// export const state = {
//   recipes: {},
//   tags: {},
//   searchRecipe: {
//     terms: "",
//     recipeResults: [],
//     tagsResults: {},
//   },
//   searchTag: {
//     terms: {
//       ingredients: "",
//       appliances: "",
//       utensils: "",
//     },
//     tagResults: {
//       ingredients: [],
//       appliances: [],
//       utensils: [],
//     },
//     selectedTags: [],
//   },
//   activeTagsBox: "",
// };

/**
 * Finding the active box and set the state with it
 */
export function getActiveTagsBox() {
  const openTagsBoxEl = document.querySelector(".active");
  if (!openTagsBoxEl) return;

  states.set("activeTagsBox", openTagsBoxEl.id);
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
        recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        )
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
    if (states.states.searchRecipe.terms.length < 3) {
      states.set("results", []);
      return;
    }

    const results = searchRecipe(
      createQuery(states.states.searchRecipe.terms),
      states.states.recipes
    );

    states.set("recipeResult", results);

    states.set(
      "tagsResults",
      getTagsResults(states.states.searchRecipe.recipeResults)
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 */
export function loadSearchResultsByTag(searchTerms) {
  // console.log("======", state.searchTag);
  try {
    const results = searchTag(
      createQuery(searchTerms),
      states.states.searchTag.results
    );

    appProxy.searchTag.tagResults[states.states.activeTagsBox] = results;

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
  states.states.recipes = await getJSON();
  states.states.tags = getTagsResults(states.states.recipes);
  states.states.searchRecipe.tagsResults = states.states.tags;
  states.states.searchTag.results = states.states.tags;
}

// init recipes
initStates();

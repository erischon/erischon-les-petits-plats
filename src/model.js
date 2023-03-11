import { createTagId, getJSON } from "./helpers";

import { Event, PropertyChangedArgs } from "./observer";

/**
 * States of the App
 */
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
      case "tagsResults":
        this.states.searchRecipe.tagsResults = value;
        break;
      case "activeTagsBox":
        this.states.activeTagsBox = value;
        break;
      case "terms":
        this.states.searchRecipe.terms = value;
        break;
      case "searchByTagTerms":
        this.states.searchTag.terms[value.type] = value.terms;
        break;
      case "searchByTagResults":
        this.states.searchTag.tagResults[value.type] = value.results;
        break;
      default:
        break;
    }

    this.valueChanged.fire(this, new PropertyChangedArgs(state, value));
  }

  remove(state, value) {
    switch (state) {
      case "selectedTag":
        const index = this.states.searchTag.selectedTags.findIndex(
          (selectedTag) => selectedTag.id === value
        );

        delete this.states.searchTag.selectedTags[index];
        // removing empty values
        this.states.searchTag.selectedTags =
          this.states.searchTag.selectedTags.filter((n) => n);
        break;
      default:
        break;
    }

    this.valueChanged.fire(this, new PropertyChangedArgs(state, value));
  }
}

export const states = new State();

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
 * Create Array of selected tags query
 */
function createTagsQuery(selectedTags) {
  return selectedTags.map((tag) => {
    return { type: tag.type, query: createQuery(tag.tag) };
  });
}

/**
 * Search recipes
 */
function searchRecipe(query, recipes) {
  performance.mark("forEach-start");

  let updatedRecipeList = [];

  recipes.forEach((recipe) => {
    if (
      query.test(recipe.name) ||
      query.test(recipe.description) ||
      query.test(recipe.ingredients.map((item) => item.ingredient))
    ) {
      updatedRecipeList.push(recipe);
    }
  });

  performance.mark("forEach-end");

  performance.measure("forEach", "forEach-start", "forEach-end");
  console.log(
    "Durations: ",
    performance.getEntriesByName("forEach").map((item) => item.duration)
  );

  return updatedRecipeList;
}

/**
 * Search recipes by tags
 */
function searchRecipeByTag(query, recipes, selectedTags) {
  let updatedRecipeList = [];

  if (query) {
    recipes.map((recipe) => {
      if (
        query.test(recipe.name) ||
        query.test(recipe.description) ||
        query.test(recipe.ingredients.map((item) => item.ingredient))
      ) {
        updatedRecipeList.push(recipe);
      }
    });
  }

  if (selectedTags.length > 0) {
    if (!updatedRecipeList.length) {
      updatedRecipeList = states.states.recipes;
    }

    selectedTags.map((tag) => {
      const query = createQuery(tag.tag);

      if (tag.type === "ingredients") {
        updatedRecipeList = updatedRecipeList.filter((recipe) => {
          return recipe.ingredients
            .map((item) => item.ingredient.toLowerCase())
            .includes(tag.tag.toLowerCase());
        });
      } else if (tag.type === "appliances") {
        updatedRecipeList = updatedRecipeList.filter((recipe) => {
          return recipe.appliance.toLowerCase() === tag.tag.toLowerCase();
        });
      } else if (tag.type === "utensils") {
        updatedRecipeList = updatedRecipeList.filter((recipe) => {
          return recipe.ustensils
            .map((item) => item.toLowerCase())
            .includes(tag.tag.toLowerCase());
        });
      }
    });
  }

  return updatedRecipeList;
}

/**
 * Search tags
 */
function searchTag(query, tags) {
  let updatedTagsList = [];

  tags[states.states.activeTagsBox].map((tag) => {
    if (query.test(tag)) {
      updatedTagsList.push(tag);
    }
  });

  return updatedTagsList;
}

/**
 * Get tags results
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
 * Load main search results
 */
export function loadRecipeSearchResult(searchTerms) {
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
 * Load tag search results
 */
export function loadTagSearchResult(searchTerms) {
  try {
    const results = searchTag(
      createQuery(searchTerms),
      states.states.searchRecipe.tagsResults
    );

    states.set("searchByTagResults", {
      type: states.states.activeTagsBox,
      results: results,
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * Load recipe search results by tag
 */
export function loadRecipeSearchResultByTag() {
  try {
    const results = searchRecipeByTag(
      createQuery(states.states.searchRecipe.terms),
      states.states.recipes,
      states.states.searchTag.selectedTags
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
 * Get the original array of recipes
 */
async function initStates() {
  states.states.recipes = await getJSON();
  states.states.tags = getTagsResults(states.states.recipes);
  states.states.searchRecipe.tagsResults = states.states.tags;
}

// init recipes
initStates();

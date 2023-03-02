import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import TagsBoxView from "./views/tagsBoxView";

import { SearchByTagsViewFactory } from "./views/searchByTagsViewFactory";
import { ResultsByTagsViewFactory } from "./views/resultsByTagsViewFactory";

const TAGS_TYPES = ["ingredients", "appliances", "utensils"];

let searchByTagView = {};
let resultsByTagView = {};

/**
 *
 */
function init() {
  searchView.addHandlerSearch(controlSearchResults);

  TAGS_TYPES.forEach((type) => {
    new TagsBoxView(type).addHandlerTagsBox(controlTagsBox);
  });
}

/**
 * Control a Tags Box
 */
function controlTagsBox() {
  model.getActiveTagsBox();

  searchByTagView = new SearchByTagsViewFactory(model.state.activeTagsBox);
  resultsByTagView = new ResultsByTagsViewFactory(model.state.activeTagsBox);

  searchByTagView.addHandlerSearch(controlSearchResultsByTag);
  resultsByTagView.render(model.state.searchRecipe.tagsResults);
}

/**
 * Control global search
 */
function controlSearchResults() {
  try {
    // Get
    const query = searchView.getQuery();
    appProxy.terms = query;

    if (!query) return;

    // Load
    model.loadSearchResults(query);

    // Render
    resultsView.render(model.state.searchRecipe.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResults()\n${err}\n ⚡🛑`);
  }
}

/**
 * Control the search with tags
 */
function controlSearchResultsByTag() {
  try {
    // Get
    const query = searchByTagView.getQuery();
    appProxy.terms[model.state.activeTagsBox] = query; // a revoir

    if (!query) return;

    // Load
    model.loadSearchResultsByTag(query);

    // Render
    resultsByTagView.render(model.state.searchRecipe.tagsResults);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResultsByTag()\n${err}\n ⚡🛑`);
  }
}

/**
 *
 */
export const handlerAppProxy = {
  set: function (obj, prop, value) {
    obj[prop] = value;

    if (prop === "results") {
      resultsView.render(obj[prop]);
    }

    if (prop === "tagsResults") {
      if (model.state.activeTagsBox) {
        resultsByTagView.render(model.state.searchRecipe.tagsResults);
      }
    }

    if (prop === "activeTagsBox") {
    }

    if (
      prop === "global" ||
      prop === "ingredients" ||
      prop === "appliances" ||
      prop === "utensils"
    ) {
      if (model.state.searchRecipe.terms.global.length < 3) {
        appProxy.search.results = [];
        appProxy.search.tagsResults = model.state.tags;
      }

      if (
        model.state.searchRecipe.terms.ingredients.length === 0 ||
        model.state.searchRecipe.terms.appliances.length === 0 ||
        model.state.searchRecipe.terms.utensils.length === 0
      ) {
        appProxy.search.tagsResults = model.state.tags;
      }
    }

    return true;
  },
};

export const appProxy = {
  search: new Proxy(model.state.searchRecipe, handlerAppProxy),
  tagsBox: new Proxy(model.state, handlerAppProxy),
};

init();

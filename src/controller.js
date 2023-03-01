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
async function controlTagsBox() {
  model.getActiveTagsBox();

  searchByTagView = new SearchByTagsViewFactory(model.state.activeTagsBox);
  resultsByTagView = new ResultsByTagsViewFactory(model.state.activeTagsBox);

  searchByTagView.addHandlerSearch(controlSearchResultsByTag);
  resultsByTagView.render(model.state.search.results);
}

/**
 * Control global search
 */
async function controlSearchResults() {
  try {
    // Get
    const query = searchView.getQuery();
    // if (!query || query.length < 3) return;
    if (!query) return;

    // Load
    await model.loadSearchResults(query);

    // Render
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResults()\n${err}\n ⚡🛑`);
  }
}

/**
 * Control the search with tags
 */
async function controlSearchResultsByTag() {
  try {
    // Get
    const query = searchByTagView.getQuery();
    if (!query) return;

    // Load
    await model.loadSearchResultsByTag(query);

    // Render
    resultsByTagView.render(model.state.search.results);
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

export const appProxy = {
  search: new Proxy(model.state.search, handlerAppProxy),
  tagsBox: new Proxy(model.state, handlerAppProxy),
  terms: new Proxy(model.state.search.terms, handlerAppProxy),
};

init();

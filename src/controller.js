import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import TagsBoxView from "./views/tagsBoxView";

import { SearchByTagsViewFactory } from "./views/searchByTagsViewFactory";

const TAGS_TYPES = ["ingredients", "appareils", "ustensiles"];

let searchByTagView = {};

function init() {
  searchView.addHandlerSearch(controlSearchResults);

  TAGS_TYPES.forEach((type) => {
    new TagsBoxView(type).addHandlerTagsBox(controlTagsBox);
  });
}

async function controlTagsBox() {
  model.getActiveTagsBox();

  searchByTagView = new SearchByTagsViewFactory(model.state.activeTagsBox);

  searchByTagView.addHandlerSearch(controlSearchResultsByTag);
}

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

async function controlSearchResultsByTag(type) {
  try {
    // Get
    const query = searchByTagView.getQuery();
    if (!query) return;
    // console.log("======query", query);

    // Load
    await model.loadSearchResultsByTag(query, model.state.activeTagsBox);
    console.log("======results", model.state.search.results);

    // Render
    // resultsByTagView.render(model.state.search.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResultsByTag()\n${err}\n ⚡🛑`);
  }
}

init();

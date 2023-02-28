import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import resultsByTagView from "./views/_resultsByTagView";

import TagsBoxView from "./views/tagsBoxView";

import { SearchByTagsFactory } from "./views/searchViewFactory";

const TAGS_TYPES = ["ingredients", "appareils", "ustensiles"];

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  // searchByTagView.addHandlerSearch(controlSearchResultsByTag);

  TAGS_TYPES.forEach((type) => {
    new TagsBoxView(type).addHandlerTagsBox(controlTagsBox);
  });
}

async function controlTagsBox() {
  model.getActiveTagsBox();

  const searchByTagView = new SearchByTagsFactory(model.state.activeTagsBox);
  searchByTagView.addHandlerSearch(
    controlSearchResultsByTag(model.state.activeTagsBox)
  );
  // controlSearchResultsByTag();
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
  const searchByTagView = new SearchByTagsFactory(model.state.activeTagsBox);

  try {
    // Get
    const query = searchByTagView.getQuery();
    if (!query) return;
    console.log("======query", query);

    // Load
    await model.loadSearchResultsByTag(query);

    // Render
    resultsByTagView.render(model.state.search.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResultsByTag()\n${err}\n ⚡🛑`);
  }
}

init();

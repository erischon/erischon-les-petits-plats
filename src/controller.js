import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import searchByTagView from "./views/searchByTagView";
import resultsByTagView from "./views/resultsByTagView";

import TagsBoxView from "./views/tagsBoxView";

const TAGS_TYPES = ["ingredients", "appareils", "ustensiles"];

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  // searchByTagView.addHandlerSearch(controlSearchResultsByTag);

  TAGS_TYPES.forEach((type) => {
    new TagsBoxView(type).addHandlerTagsBox(controlTagsBox);
  });
}

async function controlTagsBox() {
  const openTagsBoxEl = document.querySelector(".active");
  if (!openTagsBoxEl) return;

  model.getActiveTagsBox(openTagsBoxEl.id);

  console.log("===", model.state.activeTagsBox);

  // controlSearchResultsByTag(openTagsBoxEl.id);
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
    // check current results
    console.log("======type", type);

    // Get
    const query = searchByTagView.getQuery(type);
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

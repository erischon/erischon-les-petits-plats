import * as model from "./model";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

import TagsBoxView from "./views/tagsBoxView";

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  TagsBoxView.addHandlerOpen(controlTagsBox);
}

async function controlSearchResults() {
  try {
    // Get
    const query = searchView.getQuery();
    if (!query || query.length < 3) return;

    // Load
    await model.loadSearchResults(query);

    // Render
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResults()\n${err}\n ⚡🛑`);
  }
}

async function controlTagsBox(e) {
  try {
    TagsBoxView.renderTagsBox(e.srcElement.id);
  } catch (err) {
    console.error(`🛑⚡\nError controlTagsBox()\n${err}\n ⚡🛑`);
  }
}

init();

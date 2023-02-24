import * as model from "./model";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";
import tagsBoxView from "./views/tagsBoxView";

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  tagsBoxView.addHandlerDisplay(controlTagsBox);
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
    tagsBoxView.displayBox(e.srcElement.id);
  } catch (err) {
    console.error(`🛑⚡\nError controlTagsBox()\n${err}\n ⚡🛑`);
  }
}

init();

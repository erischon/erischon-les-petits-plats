import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import searchByTagView from "./views/searchByTagView";
import resultsByTagView from "./views/resultsByTagView";

import TagsBoxView from "./views/tagsBoxView";

const TAGS_TYPES = ["ingredients", "appareils", "ustensiles"];

const ingredientsBoxView = new TagsBoxView("ingredients");
const appareilsBoxView = new TagsBoxView("appareils");
const ustensilesBoxView = new TagsBoxView("ustensiles");

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  searchByTagView.addHandlerSearch(controlSearchResultsByTag);

  ingredientsBoxView.addHandlerTagsBox(getBoxsStates);
  appareilsBoxView.addHandlerTagsBox(getBoxsStates);
  ustensilesBoxView.addHandlerTagsBox(getBoxsStates);
}

async function getBoxsStates(e) {
  console.log(
    ingredientsBoxView.boxState.state,
    appareilsBoxView.boxState.state,
    ustensilesBoxView.boxState.state
  );
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

async function controlSearchResultsByTag() {
  // je dois savoir quelle box est ouverte et je sais qu'il n'y en a qu'une

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

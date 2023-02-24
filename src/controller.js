import * as model from "./model";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

function init() {
  searchView.addHandlerSearch(controlSearchResults);
}

async function controlResults() {
  try {
    if (Object.keys(model.state.search.results).length === 0) return;

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(`🛑⚡\nError controlResults()\n${err}\n ⚡🛑`);
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
}
controlSearchResults();

// function globalEventListener() {
//   const globalInput = document.querySelector(".search-container__input");

//   globalInput.addEventListener("input", (e) => {
//     globalSearch(e);
//   });
// }

// document.addEventListener("DOMContentLoaded", init);

init();

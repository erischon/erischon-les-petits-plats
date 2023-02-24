import * as model from "./model";
import resultsView from "./views/resultsView";

function init() {}

async function controlResults() {
  try {
    if (Object.keys(model.state.recipes).length === 0) return;

    resultsView.render(model.state.recipes);
  } catch (err) {
    console.error(`🛑⚡\nError controlResults()\n${err}\n ⚡🛑`);
  }
}
controlResults();

async function controlSearchResults() {
  try {
    await model.loadSearchResults("tarte");

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

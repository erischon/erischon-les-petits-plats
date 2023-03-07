import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import TagsBoxView from "./views/tagsBoxView";
import tagsContainerView from "./views/tagsContainerView";

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

  new handleStateChanges(model.states);
}

/**
 * Control a Tags Box
 */
function controlTagsBox() {
  model.getActiveTagsBox();

  searchByTagView = new SearchByTagsViewFactory(
    model.states.states.activeTagsBox
  );
  resultsByTagView = new ResultsByTagsViewFactory(
    model.states.states.activeTagsBox
  );

  searchByTagView.addHandlerSearch(controlSearchResultsByTag);
  resultsByTagView.render(model.states.states.searchRecipe.tagsResults);
  resultsByTagView.addHandlerTags(controlTags);
}

/**
 * Control global search
 */
function controlSearchResults() {
  try {
    // Get
    const query = searchView.getQuery();
    model.states.set("terms", query);

    if (!query) return;

    // Load
    model.loadSearchResults(query);

    // Render
    resultsView.render(model.states.states.searchRecipe.recipeResults);
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

    model.states.set("searchByTagTerms", {
      type: model.states.states.activeTagsBox,
      terms: query,
    });

    if (!query) return;

    // Load
    model.loadSearchResultsByTag(query);

    // Render
    resultsByTagView.render(model.states.states.searchTag.tagResults);
    resultsByTagView.addHandlerTags(controlTags);
  } catch (err) {
    console.error(`🛑⚡\nError controlSearchResultsByTag()\n${err}\n ⚡🛑`);
  }
}

/**
 *
 */
function controlTags(e) {
  tagsContainerView.renderTag(
    e.target.innerText,
    model.states.states.activeTagsBox
  );
  tagsContainerView.addHandlerRemoveTag(controlRemoveTag);

  model.states.set("selectedTag", {
    type: model.states.states.activeTagsBox,
    tag: e.target.innerText,
  });
}

/**
 *
 */
function controlRemoveTag(event) {
  tagsContainerView.removeTag(event.currentTarget.id);
}

/**
 *
 */
// export const handlerAppProxy = {
//   set: function (obj, prop, value) {
//     obj[prop] = value;

//     // if (prop === "recipeResults") {
//     //   resultsView.render(obj[prop]);
//     // }

//     // if (prop === "tagsResults") {
//     //   if (model.state.activeTagsBox) {
//     //     resultsByTagView.render(model.state.searchRecipe.tagsResults);
//     //     resultsByTagView.addHandlerTags(controlTags);
//     //   }
//     // }

//     // if (prop === "activeTagsBox") {
//     // }

//     // if (obj === "ingredient") {
//     //   if (model.state.activeTagsBox) {
//     //     resultsByTagView.render(model.state.searchRecipe.tagsResults);
//     //   }
//     // }
//     // if (
//     //   prop === "global" ||
//     //   prop === "ingredients" ||
//     //   prop === "appliances" ||
//     //   prop === "utensils"
//     // ) {
//     //   if (model.state.searchRecipe.terms.global.length < 3) {
//     //     appProxy.searchRecipe.results = [];
//     //     appProxy.searchRecipe.tagsResults = model.state.tags;
//     //   }

//     //   if (
//     //     model.state.searchRecipe.terms.ingredients.length === 0 ||
//     //     model.state.searchRecipe.terms.appliances.length === 0 ||
//     //     model.state.searchRecipe.terms.utensils.length === 0
//     //   ) {
//     //     appProxy.searchRecipe.tagsResults = model.state.tags;
//     //   }
//     // }

//     return true;
//   },
// };

// export const appProxy = {
//   searchRecipe: new Proxy(model.state.searchRecipe, handlerAppProxy),
//   searchTag: new Proxy(model.state.searchTag, handlerAppProxy),
//   tagsBox: new Proxy(model.state, handlerAppProxy),
// };

class handleStateChanges {
  constructor(state) {
    this.state = state;
    this.token = state.valueChanged.subscribe(this.value_changed.bind(this));
  }

  value_changed(sender, args) {
    if (sender === this.state && args.name === "recipeResult") {
      resultsView.render(model.states.states.searchRecipe.recipeResults);
    } else if (sender === this.state && args.name === "tagsResults") {
      if (model.states.states.activeTagsBox) {
        resultsByTagView.render(model.states.states.searchRecipe.tagsResults);
        resultsByTagView.addHandlerTags(controlTags);
      }
    } else if (sender === this.state && args.name === "selectedTag") {
      console.log(model.states.states.searchTag.selectedTags);
    } else if (sender === this.state && args.name === "terms") {
      // if there is an open Tags Box
      if (model.states.states.activeTagsBox) {
        // if terms number in global search is under 3, we reset the tagsResults
        if (model.states.states.searchRecipe.terms.length < 3) {
          model.states.set("tagsResults", model.states.states.tags);
        }
      }
    } else if (sender === this.state && args.name === "searchByTagResults") {
      if (model.states.states.activeTagsBox) {
        resultsByTagView.render(model.states.states.searchRecipe.tagsResults);
        resultsByTagView.addHandlerTags(controlTags);
        // pourquoi le render ne tient pas compte des changements de terms dans search ?
        // quand le search est vide remettre à zero les tagsResults
      }
    } else if (sender === this.state && args.name === "searchByTagTerms") {
      // if there is an open Tags Box
      if (model.states.states.activeTagsBox) {
        // if terms number in tag search is 0, we reset searchTag.tagsResults with searchRecipe.tagsResults
        if (
          model.states.states.searchTag.terms[model.states.states.activeTagsBox]
            .length === 0
        ) {
          model.states.set(
            "searchByTagResults",
            model.states.states.searchRecipe.tagsResults
          );
        }
      }
    }
  }
}

init();

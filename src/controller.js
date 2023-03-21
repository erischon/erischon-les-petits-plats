import { getJSON } from "./helpers";

import * as model from "./model";

import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import TagsBoxView from "./views/tagsBoxView";
import tagsContainerView from "./views/tagsContainerView";

import { SearchByTagsViewFactory } from "./views/searchByTagsViewFactory";
import { ResultsByTagsViewFactory } from "./views/resultsByTagsViewFactory";
import { createTagId } from "./helpers";

const TAGS_TYPES = ["ingredients", "appliances", "utensils"];

let searchByTagView = {};
let resultsByTagView = {};

/**
 * Init the app
 */
async function init() {
  searchView.addHandlerSearch(controlRecipeSearch);

  // A la demande de l'évaluateur pour afficher toutes les recettes par défaut
  // A noter que je suis en désaccord avec cette demande car je pense qu'on n'affiche pas toutes les recettes par défaut dans un contexte où le client demande à avoir un affichage performant et rapide. Quid s'il y a 5000 recettes ? On affiche 5000 recettes par défaut ? Je pense que non. Je pense qu'on affiche par exemple les recettes les plus populaires par défaut. Mais bon, c'est une demande de l'évaluateur donc je l'ai fait.
  model.states.set("recipeResult", await getJSON());
  resultsView.render(model.states.states.searchRecipe.recipeResults);

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

  searchByTagView.addHandlerSearch(controlTagSearch);
  resultsByTagView.render(model.states.states.searchRecipe.tagsResults);
  resultsByTagView.addHandlerTags(controlTagSelection);
}

/**
 * Control recipe search
 */
function controlRecipeSearch() {
  try {
    // Get
    const query = searchView.getQuery();
    model.states.set("terms", query);

    if (!query) return;

    // Load
    model.loadRecipeSearchResult(query);

    // Render
    resultsView.render(model.states.states.searchRecipe.recipeResults);
  } catch (err) {
    console.error(`🛑⚡\nError controlRecipeSearch()\n${err}\n ⚡🛑`);
  }
}

/**
 * Control tag search
 */
function controlTagSearch() {
  try {
    // Get
    const query = searchByTagView.getQuery();

    model.states.set("searchByTagTerms", {
      type: model.states.states.activeTagsBox,
      terms: query,
    });

    if (!query) return;

    // Load
    model.loadTagSearchResult(query);

    // Render
    resultsByTagView.render(model.states.states.searchTag.tagResults);
    resultsByTagView.addHandlerTags(controlTagSelection);
  } catch (err) {
    console.error(`🛑⚡\nError controlTagSearch()\n${err}\n ⚡🛑`);
  }
}

/**
 * Control tag selection
 */
function controlTagSelection(e) {
  const findSelectedTag = model.states.states.searchTag.selectedTags.find(
    (item) => item.id === createTagId(e.target.innerText)
  );

  if (!findSelectedTag) {
    tagsContainerView.renderTag(
      e.target.innerText,
      model.states.states.activeTagsBox
    );
    tagsContainerView.addHandlerRemoveTag(controlTagRemoving);
    searchByTagView.clearInput();

    model.states.set("selectedTag", {
      type: model.states.states.activeTagsBox,
      tag: e.target.innerText,
      id: createTagId(e.target.innerText),
    });

    controlSearchRecipeByTag();
  } else {
    return;
  }
}

/**
 * Control recipe search by tag selection
 */
function controlSearchRecipeByTag() {
  try {
    // Get

    // Load
    model.loadRecipeSearchResultByTag();

    // Render
    // resultsView.render(model.states.states.searchRecipe.recipeResults);
  } catch (err) {
    console.error(`🛑⚡\nError controlRecipeSearch()\n${err}\n ⚡🛑`);
  }
}

/**
 *
 */
function controlTagRemoving(event) {
  tagsContainerView.removeTag(event.currentTarget.id);
  model.states.remove("selectedTag", event.currentTarget.id);
}

/**
 * Handle state changes
 */
class handleStateChanges {
  constructor(state) {
    this.state = state;
    this.token = state.valueChanged.subscribe(this.value_changed.bind(this));
  }

  value_changed(sender, args) {
    if (sender === this.state) {
      switch (args.name) {
        case "recipeResult":
          resultsView.render(model.states.states.searchRecipe.recipeResults);
          break;
        case "tagsResults":
          if (model.states.states.activeTagsBox) {
            resultsByTagView.render(
              model.states.states.searchRecipe.tagsResults
            );
            resultsByTagView.addHandlerTags(controlTagSelection);
          }
          break;
        case "terms":
          if (
            model.states.states.searchRecipe.terms.length < 3 &&
            model.states.states.searchTag.selectedTags.length > 0
          ) {
            controlSearchRecipeByTag();
          }

          // if there is an open Tags Box
          if (model.states.states.activeTagsBox) {
            // if terms number in global search is under 3, we reset the tagsResults
            if (model.states.states.searchRecipe.terms.length < 3) {
              model.states.set("tagsResults", model.states.states.tags);
            }
          }
          break;
        case "searchByTagResults":
          if (model.states.states.activeTagsBox) {
            resultsByTagView.render(
              model.states.states.searchRecipe.tagsResults
            );
            resultsByTagView.addHandlerTags(controlTagSelection);
          }
          break;
        case "searchByTagTerms":
          if (model.states.states.activeTagsBox) {
            // if terms number in tag search is 0, we reset searchTag.tagsResults with searchRecipe.tagsResults
            if (
              model.states.states.searchTag.terms[
                model.states.states.activeTagsBox
              ].length === 0
            ) {
              model.states.set(
                "searchByTagResults",
                model.states.states.searchRecipe.tagsResults
              );
            }
          }
          break;
        case "selectedTag":
          controlSearchRecipeByTag();
          break;
        default:
          break;
      }
    }
  }
}

init();

import { recipes } from "../data/recipes";
import { DisplayResultsContainer } from "./_resultsContainer";
import { displaySearchContainer } from "./_searchContainer.js";

export default function homePage() {
  const updatedRecipes = displaySearchContainer(recipes);

  const results = new DisplayResultsContainer(recipes);
}

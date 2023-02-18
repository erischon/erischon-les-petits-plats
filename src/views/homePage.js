import { recipes } from "../data/recipes";
import { DisplayResultsContainer } from "./resultsContainer";
import { displaySearchContainer } from "./searchContainer.js";

export default function homePage() {
  const updatedRecipes = displaySearchContainer(recipes);

  const results = new DisplayResultsContainer(recipes);
}

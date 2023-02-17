import { recipes } from "./data/recipes.js";

import getUpdatedRecipeList from "./controllers/search.js";

import { searchContainer } from "./views/searchContainer.js";
import { tagsContainer } from "./views/tagsContainer.js";
import { resultsContainer } from "./views/resultsContainer.js";

import "./styles/globals.css";

document.querySelector("#app").innerHTML = `
  <header class="header-container container">
    <img src="logo.svg" />

    <h2 class="text-danger">Les petits plats</h2>
  </header>

  <main class="home-page-container">
    <section class="search-container container"></section>
    
    <section class="tags-container container"></section>

    <section class="results-container container"></section>
  </main>
`;

// Loading Views
searchContainer(recipes);
tagsContainer();
resultsContainer();

// const searchTerms: string = "tart";

// const updatedRecipeList = getUpdatedRecipeList(searchTerms, recipes);

// console.log("======updatedRecipeList", updatedRecipeList);

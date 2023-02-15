import { recipes } from "./data/recipes.js";

import { getUpdatedRecipeList } from "./controllers/search";

import { searchContainer } from "./views/searchContainer";
import { tagsContainer } from "./views/tagsContainer";
import { rsesultsContainer } from "./views/resultsContainer";

import "./styles/globals.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
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
searchContainer();
tagsContainer();
rsesultsContainer();

const searchTerms: string = "tart";

const updatedRecipeList = getUpdatedRecipeList(searchTerms, recipes);

console.log("======updatedRecipeList", updatedRecipeList);

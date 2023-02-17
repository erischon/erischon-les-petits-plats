import getUpdatedRecipeList from "../controllers/search";
import { recipes } from "../data/recipes";

export function searchContainer() {
  recipes = import(recipes);
  const searchContainerEl = document.querySelector(".search-container");
  console.log(recipes);

  const searchContainer = `
      <input
        class="search-container__input"
        type="search"
        value=""
        id="search-input"
      />
    
      <button class="search-container__btn" type="button">
        <i class="fa fa-search"></i>
      </button>
    `;

  searchContainerEl ? (searchContainerEl.innerHTML = searchContainer) : null;

  const test = searchContainerEl?.querySelector(".search-container__input");
  test.addEventListener("input", getUpdatedRecipeList(this, recipes));

  // test.querySelector(".search-container__input").oninput = function () {
  //   getUpdatedRecipeList("a", "b");
  // };

  return recipes;
}

// comment j'ajoute oninput="getUpdatedRecipeList(this.value)"

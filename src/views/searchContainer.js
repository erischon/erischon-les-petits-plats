import getUpdatedRecipeList from "../controllers/search";
import { recipes } from "../data/recipes";

export function displaySearchContainer(recipes) {
  const searchContainerEl = document.querySelector("#search-container");

  const searchContainer = `
    <div class="search-container container">
      <input
        class="search-container__input"
        type="search"
        value=""
        id="search-input"
      />
    
      <button class="search-container__btn" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
    `;

  searchContainerEl.innerHTML = searchContainer;
  // searchContainerEl.addEventListener("input", (e) => console.log(e.data));

  document.querySelector(".search-container").appendChild(searchContainerEl);
}

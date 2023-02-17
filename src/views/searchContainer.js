import getUpdatedRecipeList from "../controllers/search";
import { recipes } from "../data/recipes";

export function displaySearchContainer(recipes) {
  const searchContainerEl = document.createElement("div");

  searchContainerEl.classList.add("search-container");
  searchContainerEl.classList.add("container");

  const searchContainerHtml = `
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

  searchContainerEl.innerHTML = searchContainerHtml;

  searchContainerEl.addEventListener("input", (e) => {
    const resp = getUpdatedRecipeList(e.data, recipes);
    console.log(resp, e.data);
  });

  document.querySelector("#search-container").appendChild(searchContainerEl);
}

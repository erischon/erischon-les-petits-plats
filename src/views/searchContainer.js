import { getUpdatedRecipeList } from "../controllers/search";

const MIN_QUERY_LENGTH = 3;

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
    if (e.target.value.length >= MIN_QUERY_LENGTH) {
      const resp = getUpdatedRecipeList(e.target.value, recipes);
    }
  });

  document.querySelector("#search-container").appendChild(searchContainerEl);
}

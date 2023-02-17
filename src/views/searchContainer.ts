import getUpdatedRecipeList from "../controllers/search";

export function searchContainer(): Element {
  const searchContainerEl = document.querySelector(".search-container");

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

  return searchContainerEl!;
}

// comment j'ajoute oninput="getUpdatedRecipeList(this.value)"

import { recipes } from "../data/recipes";

export function displayResultsContainer(results) {
  const resultsContainerEl = document.createElement("div");

  resultsContainerEl.classList.add("results-container");
  resultsContainerEl.classList.add("container");

  // Displaying Cards
  function displayCards(results) {
    results.forEach((result) => {
      const articleEl = document.createElement("article");
      articleEl.classList.add("card-box");

      articleEl.innerHTML = `
      <div class="card-container-top"></div>
    
      <div class="card-container-bottom">
        <div class="card-container-bottom__top">
          <h2 class="card-title">${result.name}</h2>
    
          <div class="card-period">
            <span><i class="fa-regular fa-clock"></i></span>
            <div>${result.time}</div>
          </div>
        </div>
    
        <div class="card-container-bottom__bottom">
          <ul id="ingredients-list">
          </ul>
    
          <div>
          ${result.description}
          </div>
        </div>
      </div>
    `;

      console.log(
        "======",
        resultsContainerEl?.querySelector(".results-container"),
        resultsContainerEl?.appendChild(articleEl)
      );

      resultsContainerEl
        ?.querySelector(".results-container")
        ?.appendChild(articleEl);
    });
    // displayIngredients(results[25].ingredients);
  }

  // Displaying ingredients
  function displayIngredients(ingredients) {
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${ingredient.ingredient}: 
        <span>
          ${ingredient.quantity ? ingredient.quantity : ""}
          ${ingredient.unit ? ingredient.unit : ""}
        </span>
      `;

      resultsContainerEl.querySelector("#ingredients-list").appendChild(li);
    });
  }

  displayCards(results);
  console.log(resultsContainerEl);

  document.querySelector("#results-container").appendChild(resultsContainerEl);
}

console.log(displayResultsContainer(recipes));
displayResultsContainer(recipes);

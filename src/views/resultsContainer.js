import { recipes } from "../data/recipes";

export function displayResultsContainer(results) {
  const articleEl = document.createElement("article");

  console.log("======results", results[25]);

  articleEl.classList.add("card-box");

  const resultsContainer = `
  <div class="card-container-top"></div>

  <div class="card-container-bottom">
    <div class="card-container-bottom__top">
      <h2 class="card-title">${results[25].name}</h2>

      <div class="card-period">
        <span><i class="fa-regular fa-clock"></i></span>
        <div>${results[25].time}</div>
      </div>
    </div>

    <div class="card-container-bottom__bottom">
      <ul id="ingredients-list">
      </ul>

      <div>
      ${results[25].description}
      </div>
    </div>
  </div>
    `;

  articleEl.innerHTML = resultsContainer;

  results[25].ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${ingredient.ingredient}: 
      <span>
        ${ingredient.quantity ? ingredient.quantity : ""}
        ${ingredient.unit ? ingredient.unit : ""}
      </span>
    `;

    articleEl.querySelector("#ingredients-list").appendChild(li);
  });

  document.querySelector("#results-container").appendChild(articleEl);
}

displayResultsContainer(recipes);

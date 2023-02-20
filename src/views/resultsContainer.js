export class DisplayResultsContainer {
  constructor() {
    this.resultsContainerEl = document.querySelector(".results-container");
  }

  getCards(results) {
    if (results.length > 0) {
      this.erase();
      this.displayCards(results);
    }
  }

  erase() {
    const articles = document.querySelectorAll(".card-box");
    console.log(articles);
    articles?.forEach((article) =>
      this.resultsContainerEl?.removeChild(article)
    );
  }

  // Create Cards and Display them inside the Result's Container
  displayCards(results) {
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

      this.displayIngredients(articleEl, result.ingredients);

      this.resultsContainerEl?.appendChild(articleEl);
    });
  }

  // Displaying ingredients
  displayIngredients(articleEl, ingredients) {
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${ingredient.ingredient}${ingredient.quantity ? ":" : ""} 
        <span>
          ${ingredient.quantity ? ingredient.quantity : ""}
          ${ingredient.unit ? ingredient.unit : ""}
        </span>
      `;

      articleEl.querySelector("#ingredients-list").appendChild(li);
    });

    return articleEl;
  }
}

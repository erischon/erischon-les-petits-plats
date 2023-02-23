class ResultsView {
  __parentEl = document.querySelector(".results");
  __data;

  render(data) {
    this.__data = data;

    const markup = this.__generateMarkup();
    this.__clear();

    this.__parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  __generateMarkup() {
    return `
    <div class="results__container">
      ${this.__data.map(this.__generateCard).join("")}
    </div>
    `;
  }

  __generateCard(result) {
    return `
    <article class="card-box">
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
          ${result.ingredients
            .map((ingredient) => {
              return `
                <li>
                  ${ingredient.ingredient}${ingredient.quantity ? ":" : ""} 
                  <span>
                    ${ingredient.quantity ? ingredient.quantity : ""}
                    ${ingredient.unit ? ingredient.unit : ""}
                  </span>
                </li>
            `;
            })
            .join("")}
          </ul>
    
          <div>
          ${result.description}
          </div>
        </div>
      </div>
    </article>
    `;
  }

  __clear() {
    this.__parentEl.innerHTML = "";
  }
}

export default new ResultsView();

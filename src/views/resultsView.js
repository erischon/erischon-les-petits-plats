class ResultsView {
  _parentEl = document.querySelector(".results");
  _errorMessage = `No recipes found for your query! Please try again`;

  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    this._clear();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div class="results__container">
      ${this._data.map(this._generateCard).join("")}
    </div>
    `;
  }

  _generateCard(result) {
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

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="message">
      <div>
        <i class="fa-solid fa-circle-exclamation"></i>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsView();

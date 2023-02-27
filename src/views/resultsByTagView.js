class ResultsByTagView {
  _parentEl = document.querySelector(".resultsByTag");
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
        <ul>
        ${this._data.map(this._generateTagList).join("")}
        </ul>
    `;
  }

  _generateTagList(results) {
    return results.ingredients
      .map((ingredient) => {
        return `
      <li>${ingredient.ingredient}</li>
      `;
      })
      .join("");
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="message">
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>${message}</span>
    </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsByTagView();

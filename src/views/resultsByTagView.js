/**
 *
 */
class ResultsByTagView {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    this._clear();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
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

/**
 *
 */
export class IngredientsTagsView extends ResultsByTagView {
  _parentEl = document.querySelector(`.resultsByTag__ingredients`);
  _errorMessage = `No Ingredients found`;

  _generateMarkup() {
    return `
        <ul>
        ${this._data.ingredients.map(this._generateTagList).join("")}
        </ul>
    `;
  }

  _generateTagList(results) {
    return `
      <li>${results}</li>
      `;
  }
}

/**
 *
 */
export class AppliancesTagsView extends ResultsByTagView {
  _parentEl = document.querySelector(`.resultsByTag__appliances`);
  _errorMessage = `No Appliances found`;

  _generateMarkup() {
    return `
        <ul>
        ${this._data.appliances.map(this._generateTagList).join("")}
        </ul>
    `;
  }

  _generateTagList(results) {
    return `
      <li>${results}</li>
      `;
  }
}

/**
 *
 */
export class UtensilsTagsView extends ResultsByTagView {
  _parentEl = document.querySelector(`.resultsByTag__utensils`);
  _errorMessage = `No Utensils found`;

  _generateMarkup() {
    return `
        <ul>
        ${this._data.utensils.map(this._generateTagList).join("")}
        </ul>
    `;
  }

  _generateTagList(results) {
    return `
      <li>${results}</li>
      `;
  }
}

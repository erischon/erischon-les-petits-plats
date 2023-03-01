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
  _errorMessage = `No recipes found for your query! Please try again`;

  _generateMarkup() {
    let ingredientsTags = [
      ...new Set(
        this._data.map((recipe) =>
          recipe.ingredients.map((ingredient) => ingredient.ingredient)
        )
      ),
    ];
    ingredientsTags = [...new Set(ingredientsTags.flat(1))];

    return `
        <ul>
        ${ingredientsTags.map(this._generateTagList).join("")}
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
  _errorMessage = `No recipes found for your query! Please try again`;

  _generateMarkup() {
    const appliancesTags = [
      ...new Set(this._data.map((recipe) => recipe.appliance)),
    ];

    return `
        <ul>
        ${appliancesTags.map(this._generateTagList).join("")}
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
  _errorMessage = `No recipes found for your query! Please try again`;

  _generateMarkup() {
    let utensilsTags = [
      ...new Set(this._data.map((recipe) => recipe.ustensils)),
    ];
    utensilsTags = [...new Set(utensilsTags.flat(1))];

    return `
        <ul>
        ${utensilsTags.map(this._generateTagList).join("")}
        </ul>
    `;
  }

  _generateTagList(results) {
    return `
      <li>${results}</li>
      `;
  }
}

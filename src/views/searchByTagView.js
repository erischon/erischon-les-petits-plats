class SearchbyTagView {
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("input", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export class SearchByIngredients extends SearchbyTagView {
  _parentEl = document.querySelector(`.searchByTag__form--ingredients`);

  getQuery() {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--ingredients`
    ).value;

    return query;
  }
}

export class SearchByAppliances extends SearchbyTagView {
  _parentEl = document.querySelector(`.searchByTag__form--appliances`);

  getQuery() {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--appliances`
    ).value;

    return query;
  }
}

export class SearchByUtensils extends SearchbyTagView {
  _parentEl = document.querySelector(`.searchByTag__form--utensils`);

  getQuery() {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--utensils`
    ).value;

    return query;
  }
}

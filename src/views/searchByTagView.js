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

export class SearchByAppareils extends SearchbyTagView {
  _parentEl = document.querySelector(`.searchByTag__form--appareils`);

  getQuery() {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--appareils`
    ).value;

    return query;
  }
}

export class SearchByUstensiles extends SearchbyTagView {
  _parentEl = document.querySelector(`.searchByTag__form--ustensiles`);

  getQuery() {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--ustensiles`
    ).value;

    return query;
  }
}

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

    console.log(this._parentEl);

    return query;
  }
}

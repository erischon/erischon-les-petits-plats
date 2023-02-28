class SearchbyTagView {
  // _parentEl = document.querySelector(`.searchByTag__form--${type}`);
  _parentEl;

  getQuery(type) {
    const query = this._parentEl.querySelector(
      `.searchByTag__input--${type}`
    ).value;

    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("input", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchbyTagView();

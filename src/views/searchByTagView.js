class SearchbyTagView {
  _parentEl = document.querySelector(".searchByTag");

  getQuery() {
    const query = this._parentEl.querySelector(
      ".searchByTag__ingredient"
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

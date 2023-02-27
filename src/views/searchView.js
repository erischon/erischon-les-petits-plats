class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;

    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("input", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();

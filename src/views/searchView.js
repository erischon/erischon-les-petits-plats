class SearchView {
  __parentEl = document.querySelector(".search");

  getQuery() {
    const query = this.__parentEl.querySelector(".search__field").value;

    return query;
  }

  addHandlerSearch(handler) {
    this.__parentEl.addEventListener("input", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

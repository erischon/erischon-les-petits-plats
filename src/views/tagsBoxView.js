class TagsBoxView {
  _parentEl = document.querySelector("#ingredients");

  displayBox(type) {
    this._clear();
    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div class="results__container">
      <p>toto</p>
    </div>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  addHandlerDisplay(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();

      handler(e);
    });
  }
}

export default new TagsBoxView();

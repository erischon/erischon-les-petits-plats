export class TagsBoxView {
  _parentEl = document.querySelector("#ingredients");
  _openButtonEl = this._parentEl.querySelector(".dropdown__btn.open");
  _closeButtonEl = null;

  renderTagsBox(type) {
    this._openBox();

    this._closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");

    this.addHandlerClose();
  }

  _generateMarkup() {
    return `
    <div class="wrapper">
      <div class="search-tag">
        <input type="text" placeholder="Rechercher un ingrédient" />

        <button class="dropdown__btn close">
          <i class="fa fa-chevron-up"></i>
        </button>
      </div>

      <div class="results-tag">
        <ul>
          <li>plusieurs mots longs 1</li>
        </ul>
      </div>
    </diV>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  _openBox() {
    this._parentEl.classList.remove("inactive");
    this._parentEl.classList.add("active");

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _closeBox() {
    const wrapper = this._parentEl.querySelector(".wrapper");

    this._parentEl.classList.remove("active");
    this._parentEl.classList.add("inactive");

    wrapper.innerHTML = "";
  }

  addHandlerOpen(handler) {
    this._openButtonEl.addEventListener("click", function (e) {
      e.preventDefault();

      handler(e);
    });
  }

  addHandlerClose() {
    this._closeButtonEl.addEventListener("click", (e) => {
      this._closeBox();
    });
  }
}

export default new TagsBoxView();

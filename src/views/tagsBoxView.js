export class TagsBoxView {
  _parentEl = document.querySelector("#ingredients");
  _buttonEl = this._parentEl.querySelector(".dropdown__btn");

  displayBox(type) {
    const boxState = this._parentEl.className.search("inactive");

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
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

  addHandlerDisplay(handler) {
    this._buttonEl.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e);
      handler(e);
    });
  }
}

export default new TagsBoxView();

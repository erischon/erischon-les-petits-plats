export class TagsBoxView {
  _parentEl = document.querySelector("#ingredients");
  _buttonEl = this._parentEl.querySelector(".dropdown__btn");

  displayBox(type) {
    this._clear();
    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div class="results__container">
      <p>Le nouveau container</p>
    </div>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  addHandlerDisplay(handler) {
    this._buttonEl.addEventListener("click", function (e) {
      e.preventDefault();

      handler(e);
    });
  }
}

export default new TagsBoxView();

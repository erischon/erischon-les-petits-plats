export class TagsBoxViewIngredients {
  _parentEl = document.querySelector("#ingredients");
  _openButtonEl = this._parentEl.querySelector(".dropdown__btn.open");
  _closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");

  addHandlerOpen(handler) {
    this._openButtonEl.addEventListener("click", (e) => {
      this._openBox();
    });
  }

  addHandlerClose() {
    this._closeButtonEl.addEventListener("click", (e) => {
      this._closeBox();
    });
  }

  _openBox() {
    this._parentEl.classList.remove("inactive");
    this._parentEl.classList.add("active");

    const wrapper = this._parentEl.querySelector(".wrapper");
    wrapper.classList.remove("hidden");
  }

  _closeBox() {
    this._parentEl.classList.remove("active");
    this._parentEl.classList.add("inactive");

    const wrapper = this._parentEl.querySelector(".wrapper");
    wrapper.classList.add("hidden");
  }
}

export default new TagsBoxViewIngredients();

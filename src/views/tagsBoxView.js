export class TagsBoxView {
  _parentEl;

  addHandlerOpen(type) {
    this._parentEl = document.querySelector(`#${type}`);
    const openButtonEl = this._parentEl.querySelector(".dropdown__btn.open");

    openButtonEl.addEventListener("click", (e) => {
      this._openBox();
    });
  }

  addHandlerClose(type) {
    this._parentEl = document.querySelector(`#${type}`);
    const closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");

    closeButtonEl.addEventListener("click", (e) => {
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

export default new TagsBoxView();

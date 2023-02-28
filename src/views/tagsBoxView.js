export default class TagsBoxView {
  constructor(type) {
    this._parentEl = document.querySelector(`#${type}`);

    this._addEventOpen();
    this._addEventClose();

    this.boxState = {
      name: type,
      state: false,
    };
  }

  getState() {
    return this.boxState;
  }

  addHandlerTagsBox(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();

      handler(e);
    });
  }

  _addEventOpen() {
    const openButtonEl = this._parentEl.querySelector(".dropdown__btn.open");

    openButtonEl.addEventListener("click", (e) => {
      this._openBox();
      this.boxState.state = true;
    });
  }

  _addEventClose() {
    const closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");

    closeButtonEl.addEventListener("click", (e) => {
      this._closeBox(this._parentEl);
    });
  }

  _openBox() {
    const otherOpenEl = document.querySelector(".active");
    if (otherOpenEl) {
      this._closeBox(otherOpenEl);
    }

    this._parentEl.classList.remove("inactive");
    this._parentEl.classList.add("active");

    const wrapper = this._parentEl.querySelector(".wrapper");
    wrapper.classList.remove("hidden");
  }

  _closeBox(parentEl) {
    parentEl.classList.remove("active");
    parentEl.classList.add("inactive");

    const wrapper = parentEl.querySelector(".wrapper");
    wrapper.classList.add("hidden");
  }
}

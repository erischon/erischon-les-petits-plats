class TagsBoxView {
  _parentEl = document.querySelector(".dropdown");

  displayBox() {
    console.log("toto");
  }

  addHandlerDisplay(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new TagsBoxView();

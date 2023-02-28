export class TagsBoxViewIngredients {
  _parentEl = document.querySelector("#ingredients");
  _openButtonEl = this._parentEl.querySelector(".dropdown__btn.open");
  _closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");

  // _data;

  // render(data, type) {
  //   // init
  //   this._data = data;
  //   this._openBox();

  //   const markup = this._generateMarkup();
  //   this._parentEl.insertAdjacentHTML("afterbegin", markup);

  //   this._closeButtonEl = this._parentEl.querySelector(".dropdown__btn.close");
  //   this.addHandlerClose();
  // }

  // generateNewList(data) {
  //   if (this._parentEl.classList.value.search("inactive") > 0) {
  //     return;
  //   }

  //   this._data = data;
  //   this._clear();

  //   const markup = this._generateMarkup();
  //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
  // }

  // _generateMarkup() {
  //   return `
  //   <div class="wrapper">
  //     <div class="search-tag">
  //       <input type="text" placeholder="Rechercher un ingrédient" />

  //       <button class="dropdown__btn close">
  //         <i class="fa fa-chevron-up"></i>
  //       </button>
  //     </div>

  //     <div class="results-tag">
  //       <ul>
  //       ${this._data.map(this._generateTagList).join("")}
  //       </ul>
  //     </div>
  //   </diV>
  //   `;
  // }

  // _generateTagList(results) {
  //   return results.ingredients
  //     .map((ingredient) => {
  //       return `
  //     <li>${ingredient.ingredient}</li>
  //     `;
  //     })
  //     .join("");
  // }

  // _clear() {
  //   this._parentEl.innerHTML = "";
  // }

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

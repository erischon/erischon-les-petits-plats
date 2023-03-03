import { BTN_COLOR } from "../config";
import { createTagId } from "../helpers";

class TagsContainerView {
  _parentEl = document.querySelector(".tags-group");

  _data;
  _btnColor;
  _tagId;

  renderTag(data, type) {
    this._data = data;
    this._btnColor = BTN_COLOR[type];
    this._tagId = createTagId(this._data);

    const markup = this._generateMarkup();

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div class="tag ${this._btnColor}" id="${this._tagId}">
      <span>${this._data}</span>
      <button class="tag__close-btn" id="${this._tagId}">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    </div>
    `;
  }

  addHandlerRemoveTag(handler) {
    const button = this._parentEl.querySelector(`#${this._tagId}`);
    const closeButtonEl = button.querySelector(`.tag__close-btn`);

    closeButtonEl.addEventListener("click", (e) => {
      handler(e, this._tagId);
    });
  }

  removeTag(tagId) {
    const btn = this._parentEl.querySelector(`#${tagId}`);

    btn.remove();
  }
}

export default new TagsContainerView();

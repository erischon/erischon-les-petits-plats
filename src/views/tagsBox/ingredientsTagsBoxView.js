import { TagsBoxView } from "./tagsBoxView";

class IngredientsTagsBoxView extends TagsBoxView {
  _parentEl = document.querySelector("#ingredients");
}

export default new IngredientsTagsBoxView();

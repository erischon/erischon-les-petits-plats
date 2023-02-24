import { TagsBoxView } from "./tagsBoxView";

class AppareilsTagsBoxView extends TagsBoxView {
  _parentEl = document.querySelector("#appareils");
}

export default new AppareilsTagsBoxView();

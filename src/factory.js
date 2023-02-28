import {
  AppareilsTagsView,
  IngredientsTagsView,
} from "./views/resultsByTagView";

export class ResultsByTagsFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new IngredientsTagsView();
    } else if (type === "appareils") {
      return new AppareilsTagsView();
    } else {
      throw "Unknown type";
    }
  }
}

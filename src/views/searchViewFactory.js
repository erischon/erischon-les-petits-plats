import { SearchByIngredients } from "./searchByTagView";

export class SearchByTagsFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new SearchByIngredients();
    } else if (type === "appareils") {
      return new AppareilsTagsView();
    } else {
      throw "Unknown type";
    }
  }
}

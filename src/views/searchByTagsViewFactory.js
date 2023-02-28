import {
  SearchByIngredients,
  SearchByAppareils,
  SearchByUstensiles,
} from "./searchByTagView";

export class SearchByTagsViewFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new SearchByIngredients();
    } else if (type === "appareils") {
      return new SearchByAppareils();
    } else if (type === "ustensiles") {
      return new SearchByUstensiles();
    } else {
      throw "Unknown type";
    }
  }
}

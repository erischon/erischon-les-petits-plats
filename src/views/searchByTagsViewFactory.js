import {
  SearchByIngredients,
  SearchByAppliances,
  SearchByUtensils,
} from "./searchByTagView";

export class SearchByTagsViewFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new SearchByIngredients();
    } else if (type === "appliances") {
      return new SearchByAppliances();
    } else if (type === "utensils") {
      return new SearchByUtensils();
    } else {
      throw "Unknown type";
    }
  }
}

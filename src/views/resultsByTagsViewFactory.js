import {
  AppliancesTagsView,
  UtensilsTagsView,
  IngredientsTagsView,
} from "./resultsByTagView";

/**
 *
 */
export class ResultsByTagsViewFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new IngredientsTagsView();
    } else if (type === "appliances") {
      return new AppliancesTagsView();
    } else if (type === "utensils") {
      return new UtensilsTagsView();
    } else {
      throw "Unknown type";
    }
  }
}

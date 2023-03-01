import {
  AppliancesTagsView,
  IngredientsTagsView,
} from "./views/resultsByTagView";

export class ResultsByTagsFactory {
  constructor(type) {
    if (type === "ingredients") {
      return new IngredientsTagsView();
    } else if (type === "appliances") {
      return new AppliancesTagsView();
    } else {
      throw "Unknown type";
    }
  }
}

// class State {
//   constructor() {
//     this.valueChanged = new Event();
//     this.states = {
//       recipes: {},
//       tags: {},
//       searchRecipe: {
//         terms: "",
//         recipeResults: [],
//         tagsResults: {},
//       },
//       searchTag: {
//         terms: {
//           ingredients: "",
//           appliances: "",
//           utensils: "",
//         },
//         tagResults: {
//           ingredients: [],
//           appliances: [],
//           utensils: [],
//         },
//         selectedTags: [],
//       },
//       activeTagsBox: "",
//     };
//   }

//   set(state, value) {
//     switch (state) {
//       case "selectedTag":
//         this.states.searchTag.selectedTags.push(value);
//         break;
//       case "recipeResult":
//         this.states.searchRecipe.recipeResults = value;
//         break;
//       default:
//         break;
//     }

//     this.valueChanged.fire(this, new PropertyChangedArgs(state, value));
//   }
// }

export class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubsribe(index) {
    this.handlers.delete(index);
  }

  fire(sender, args) {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

export class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

// export default new State();

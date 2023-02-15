// function createSearchPool(data: recipe[], useCase: number) {
//   const searchPool: any = [];

//   // const params = [{ type: "axe1", key: ["name", "description"] }];

//   if (useCase === 1) {
//     data.map((recipe: any) => {
//       searchPool.push({ id: recipe.id, data: recipe.name });
//     });

//     data.map((recipe: any) => {
//       searchPool.push({ id: recipe.id, data: recipe.description });
//     });

//     data.map((recipe: any) => {
//       recipe.ingredients.map((item: any) => {
//         searchPool.push({ id: recipe.id, data: item.ingredient });
//       });
//     });
//   } else if (useCase === 2) {
//     data.map((recipe: any) => {
//       recipe.ingredients.map((item: any) => {
//         searchPool.push({ id: recipe.id, data: item.ingredient });
//       });
//     });

//     data.map((recipe: any) => {
//       recipe.ustensils.map((item: any) => {
//         searchPool.push({ id: recipe.id, data: item });
//       });
//     });

//     data.map((recipe: any) => {
//       searchPool.push({ id: recipe.id, data: recipe.appliance });
//     });
//   } else {
//     return;
//   }

//   console.log(searchPool);
//   return searchPool;
// }

/**
 * Get a updated list of recipe in relation to a serach term
 * @param searchTerms
 * @param recipes
 * @returns
 */
const getUpdatedRecipeList = (searchTerms: string, recipes: recipe[]) => {
  let updatedRecipeList: Array<recipe> = [];

  const searchWords = new RegExp(searchTerms.replace(/\s/g, ""), "gi");

  recipes.map((recipe: any) => {
    if (searchWords.test(recipe.name)) {
      updatedRecipeList.push(recipe);
    }

    if (searchWords.test(recipe.description)) {
      updatedRecipeList.push(recipe);
    }

    recipe?.ingredients?.map((item: any) => {
      if (searchWords.test(item)) {
        updatedRecipeList.push(recipe);
      }
    });
  });

  return updatedRecipeList;
};

export { getUpdatedRecipeList };

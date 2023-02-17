/**
 * Get an updated list of recipe in relation to a serach term
 * @param searchTerms
 * @param recipes
 * @returns
 */
export function getUpdatedRecipeList(searchTerms, recipes) {
  let updatedRecipeList = [];

  const searchWords = new RegExp(searchTerms, "gi");

  recipes.map((recipe) => {
    if (searchWords.test(recipe.name)) {
      updatedRecipeList.push(recipe);
    }

    if (searchWords.test(recipe.description)) {
      updatedRecipeList.push(recipe);
    }

    recipe?.ingredients?.map((item) => {
      if (searchWords.test(item)) {
        updatedRecipeList.push(recipe);
      }
    });
  });

  // console.log(updatedRecipeList);

  return updatedRecipeList;
}

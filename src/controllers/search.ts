import { recipes } from "../data/recipes";

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

export default getUpdatedRecipeList;

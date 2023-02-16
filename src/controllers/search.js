import { recipes } from "../data/recipes";

export default function display(value) {
  console.log(value);
}

/**
 * Get an updated list of recipe in relation to a serach term
 * @param searchTerms
 * @param recipes
 * @returns
 */
export const getUpdatedRecipeList = (searchTerms) => {
  let updatedRecipeList = [];

  const searchWords = new RegExp(searchTerms.replace(/\s/g, ""), "gi");

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

  return updatedRecipeList;
};

// export default getUpdatedRecipeList;

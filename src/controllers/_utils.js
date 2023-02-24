export function setLocalStorage(recipesList) {
  localStorage.setItem("recipesList", JSON.stringify(recipesList));
}

export function getRecipesList(key) {
  return JSON.parse(localStorage.getItem(key));
}

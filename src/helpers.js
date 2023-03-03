import { recipes } from "./data/recipes";

/**
 * Get data
 */
async function getJSON() {
  try {
    const data = recipes;

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Create a Tag Id :
 * remove accents
 * replace space by -
 * move to lower case
 */
function createTagId(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export { createTagId, getJSON };

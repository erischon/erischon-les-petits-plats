import { recipes } from "./data/recipes";

export async function getJSON() {
  try {
    const data = recipes;

    return data;
  } catch (err) {
    throw err;
  }
}

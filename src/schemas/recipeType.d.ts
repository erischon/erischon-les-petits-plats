type recipe = {
  id: number;
  name: string;
  servings: number;
  ingredients: Array<ingredients>;
  time: number;
  description: string;
  appliance: string;
  ustensils: Array<string>;
};

type ingredients = {
  ingredient: string;
  quantity?: number | string;
  unit?: string;
};

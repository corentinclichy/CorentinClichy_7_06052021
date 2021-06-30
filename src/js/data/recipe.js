import Helpers from "../utils/helpers.js";
import { recipes } from "../../ressources/data.js";
import Search from "./search.js";

class Recipe {
  constructor(ingredients, appareils, ustensils) {
    this.recipes = recipes;
    this.ingredients = [];
    this.ustensils = [];
    this.appareils = [];
    this.helpers = new Helpers();
    this.updatedRecipes = [];
    this.mapTable;
  }

  listOfFilter(filterName, filterItemName, input) {
    let filteredArray = new Set();

    /// Input empty or input is not empty
    if (this.updatedRecipes.length === 0) {
      this.recipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filteredArray.add(filterItem);
            } else {
              filteredArray.add(filterItem[filterItemName]);
            }
          });
        } else {
          filteredArray.add(recipe[filterItemName]);
        }
      });
    } else {
      this.updatedRecipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filteredArray.add(filterItem);
            } else {
              filteredArray.add(filterItem[filterItemName]);
            }
          });
        } else {
          filteredArray.add(recipe[filterItemName]);
        }
      });
    }

    if (input === undefined) {
      return filteredArray;
    } else {
      filteredArray = [...filteredArray];

      const search = new Search(input, filteredArray);
      const searchFilterItems = search.filterSearch();
      return searchFilterItems;
    }
  }

  filteredRecipes(input, badges) {
    const search = new Search(input, this.recipes, badges);

    this.updatedRecipes = search.getFilteredRecipes();
    console.log(this.updatedRecipes);

    return this.updatedRecipes;
  }

  allrecipes() {
    const search = new Search("", this.recipes, "");
    let allRecipes = [...this.recipes];

    this.mapTable = search.createMapTable();
    console.log(this.mapTable);
    return allRecipes;
  }
}

export default Recipe;

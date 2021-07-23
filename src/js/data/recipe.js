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
    this.mapTable = new Search("", this.recipes, "").createMapTable();
  }

  //TODO: COMMENT THIS CODE
  listOfFilter(filterName, filterItemName, input) {
    let filterItemList = new Set();
    /// Input empty or input is not empty
    if (this.updatedRecipes.length === 0) {
      this.recipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filterItemList.add(filterItem);
            } else {
              filterItemList.add(filterItem[filterItemName]);
            }
          });
        } else {
          filterItemList.add(recipe[filterItemName]);
        }
      });
    } else {
      this.updatedRecipes.map((recipe) => {
        if (Array.isArray(recipe[filterName])) {
          recipe[filterName].map((filterItem) => {
            if (filterItem[filterItemName] === undefined) {
              filterItemList.add(filterItem);
            } else {
              filterItemList.add(filterItem[filterItemName]);
            }
          });
        } else {
          filterItemList.add(recipe[filterItemName]);
        }
      });
    }

    if (input === undefined) {
      return filterItemList;
    } else {
      return new Search(input, [...filterItemList]).filterSearch();
    }
  }

  filteredRecipes(input, badges) {
    this.updatedRecipes = new Search(
      input,
      this.recipes,
      badges
    ).getFilteredRecipes(this.mapTable);
    return this.updatedRecipes;
  }

  /**
   * @returns {Array} Array of recipes
   * @description
   * Gives back an array of all recipes and generate the hashTable
   */
  allrecipes() {
    return [...this.recipes];
  }
}

export default Recipe;

import { recipes } from "../../ressources/data.js";
import Helpers from "../utils/helpers.js";

class Search {
  //this.input @string
  //this.tags @Array
  constructor(input, filteredArray, badges) {
    this.input = input;
    this.filteredArray = filteredArray;
    this.helpers = new Helpers();
    this.badges = badges;
    this.mapTable = this.createMapTable();
  }

  // KEYWORDS RELATED METHODS

  // get an array of input including badges and input words
  filterSearch() {
    return this.filteredArray.filter((word) =>
      this.helpers.normalize(word).includes(this.helpers.normalize(this.input))
    );
  }

  /**
   * @returns {Array}
   * @description
   * This method creates a table of the keywords that are present in the
   * `recipes` array.
   * The table is used to display the keywords in a more readable way.
   * The table is a 2D array, where the first index is the keyword and the
   * second index is the index of the recipes in the recipes array
   * */
  createMapTable() {
    let mapRecipes = {};

    this.filteredArray.forEach((recipe) => {
      // get all keywords of the recipes array
      const keywordsArray = [
        ...this._splitAndTakeOffStopWords(recipe.name),
        ...this._splitAndTakeOffStopWords(recipe.description),
      ];

      // for each keyword
      keywordsArray.forEach((keyword) => {
        for (let i = 1; i <= keyword.length; i++) {
          //create all the substrings of the keyword
          const substring = keyword.slice(0, i);

          // Check if the substring is already in the map
          if (substring in mapRecipes) {
            // if it is, add the index of the recipe to the array
            mapRecipes[substring].add(this.filteredArray.indexOf(recipe));
          } else {
            // if it is not, create a new Set with the index of the recipe
            mapRecipes[substring] = new Set([
              this.filteredArray.indexOf(recipe),
            ]);
          }
        }
      });
    });
    return mapRecipes;
  }

  /**
   * @returns {Array}
   * @description
   * This method splits the input string into an array of words and removes
   * stop words from the array.
   * */
  _splitAndTakeOffStopWords(string) {
    // split string into an array of words and normalize each word
    const stringArray = this.helpers.normalize(string).split(" ");
    // remove stop words from the array and return the array
    return this.helpers.keywordsWhitoutStopWords(stringArray);
  }

  /**
   * @returns {Array}
   * @description
   * This method returns an array of all the user keywords (input or/and badges)
   * */
  _getKeywordsInputs() {
    let filterKeywordsNorm;
    let filterKeywordsNormArray = [];
    let keywordsArray;

    // Normalize input and split into an array of words
    const inputKw = this.helpers.normalize(this.input).split(" ");

    // If there is badge
    // If there is no badge keywordArray equal to the input keywords
    this.badges.length > 0
      ? this.badges.forEach((badge) => {
          // split, normalize and add the badge to the array filterKeywordsNorm
          // add the badge to the array filterKeywordsNormArray
          this.helpers
            .normalize(badge.innerText)
            .split(" ")
            .map((keyword) => {
              filterKeywordsNormArray.push(keyword);
            });

          // If the input is empty
          // If it is keyword array equal only to the badge array
          // if it is not, keywordArray equal to the combination of the badge array and the input array
          inputKw === ""
            ? (keywordsArray = [...filterKeywordsNormArray])
            : (keywordsArray = [...inputKw, ...filterKeywordsNormArray]);
        })
      : (keywordsArray = [...inputKw]);

    // return the array of combined keywords normaliszed and without stop words
    return this.helpers.keywordsWhitoutStopWords(keywordsArray);
  }

  /**
   * @returns {Array}
   * @description
   * This method returns an array of all the user badges
   * */
  getFilteredRecipes() {
    // Get keywords from the input and badges
    const keywordsInput = this._getKeywordsInputs();
    let keywordsRecipesIndex;

    // For each keyword, if it is in the map table, get the recipes index
    keywordsInput.forEach((keyword) => {
      // If the keyword is in the map table
      // if it is, get the recipes index
      // if it is not, return an empty array
      if (keyword in this.mapTable) {
        // get the recipes index (set
        keywordsRecipesIndex = this.mapTable[keyword];
      } else {
        keywordsRecipesIndex = new Set();
      }
    });

    // Filter the recipes array with the recipes index
    // return the array of recipes who are inside keywordsRecipesIndex
    return this.filteredArray.filter((recipe, index) =>
      [...keywordsRecipesIndex].includes(index)
    );
  }
}

export default Search;

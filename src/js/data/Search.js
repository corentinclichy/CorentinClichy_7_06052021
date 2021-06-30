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

  filterSearch() {
    const searchFilterItem = this.filteredArray.filter((word) =>
      this.helpers.normalize(word).includes(this.helpers.normalize(this.input))
    );

    return searchFilterItem;
  }

  createMapTable() {
    let mapRecipes = {};
    let recipeKeywords = [];

    this.filteredArray.forEach((recipe) => {
      const recipeName = recipe.name;
      const recipeDescription = recipe.description;

      const recipeNameSplit = this._splitAndTakeOffStopWords(recipeName);

      const recipeDescriptionSplit =
        this._splitAndTakeOffStopWords(recipeDescription);

      const keywordsArray = [...recipeNameSplit, ...recipeDescriptionSplit];

      keywordsArray.forEach((keyword) => {
        for (let i = 1; i <= keyword.length; i++) {
          const substring = keyword.slice(0, i);

          if (substring in mapRecipes) {
            mapRecipes[substring].add(recipe);
          } else {
            mapRecipes[substring] = new Set([recipe]);
          }
        }
      });
    });

    return mapRecipes;
  }

  _splitAndTakeOffStopWords(string) {
    const stringNormalized = this.helpers.normalize(string);
    const stringArray = stringNormalized.split(" ");
    const stringArrayWhitoutStopWords =
      this.helpers.KeywordsWhitoutStopWords(stringArray);
    return stringArrayWhitoutStopWords;
  }

  _getKeywordsInputs() {
    let filterKeywordsNorm;
    let filterKeywordsNormArray = [];

    let keywordsArray;
    // get input and filter keywords
    const inputKw = this.input.split(" ");
    let inputKwNorm = [];

    inputKw.forEach((inputkw) => {
      inputKw != "" && inputKwNorm.push(this.helpers.normalize(inputkw));
    });

    this.badges.length > 0
      ? this.badges.forEach((badge) => {
          const filterNameString = this.helpers.normalize(badge.innerText);
          filterKeywordsNorm = filterNameString.split(" ");

          filterKeywordsNorm.map((keyword) => {
            filterKeywordsNormArray.push(keyword);
          });

          keywordsArray = [...inputKwNorm, ...filterKeywordsNormArray];
        })
      : (keywordsArray = [...inputKwNorm]);

    //take out stopwords from the array
    keywordsArray = this.helpers.KeywordsWhitoutStopWords(keywordsArray);

    return keywordsArray;
  }

  getFilteredRecipes() {
    let keywordsRecipes = new Set();
    let updatedRecipes = new Set();

    const keywordsInput = this._getKeywordsInputs();
    console.log(keywordsInput);
    let filteredRecipes = new Set(this.filteredArray);

    keywordsInput.forEach((keyword) => {
      let keywordsRecipes;

      if (keyword in this.mapTable) {
        keywordsRecipes = this.mapTable[keyword];
      } else {
        keywordsRecipes = new Set();
      }

      filteredRecipes = new Set(
        [...keywordsRecipes].filter((recipe) => filteredRecipes.has(recipe))
      );
    });

    return [...filteredRecipes];
  }
}

export default Search;

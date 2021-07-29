import { recipes } from "../../ressources/data.js";
import Helpers from "../utils/helpers.js";

class Search {
  constructor(input, filteredArray, badges) {
    this.input = input;
    this.filteredArray = filteredArray;
    this.helpers = new Helpers();
    this.badges = badges;
  }

  /**
   * @description Filter the list of filter based on the search input of each filter
   * @returns {Array}
   **/
  filterSearch() {
    return this.filteredArray.filter((word) =>
      this.helpers.normalize(word).includes(this.helpers.normalize(this.input))
    );
  }

  /**
   * @description Get all the keyword (input and badges) and filter the list of recipes
   * @returns {Array}
   **/
  recipesSearchWithFilter(keywordInputTest) {
    // get input and filter keywords
    let filterKeywordsNormArray = [];
    let inputKwNorm = [];

    let keywordsArray;

    if (Array.isArray(keywordInputTest)) {
      keywordsArray = keywordInputTest;
    } else {
      //split and normalisze input keywords
      this.input.split(" ").forEach((inputkw) => {
        inputKwNorm.push(this.helpers.normalize(inputkw));
      });

      this.badges.length > 0
        ? this.badges.forEach((badge) => {
            this.helpers
              .normalize(badge.innerText)
              .split(" ")
              .map((keyword) => {
                filterKeywordsNormArray.push(keyword);
              });

            keywordsArray = [...inputKwNorm, ...filterKeywordsNormArray];
          })
        : (keywordsArray = [...inputKwNorm]);

      //take out stopwords from the array
      keywordsArray = this.helpers.KeywordsWhitoutStopWords(keywordsArray);
    }

    //filtre avec l'ensemble des keyword
    // true or false
    return this.filteredArray.filter((recipe) => {
      // Filter return true if the recipe has all the keywords
      const matchKeywords = keywordsArray.every((keyword) => {
        //check if every keyword match on of the condition
        return (
          this.helpers.normalize(recipe.name).includes(keyword) ||
          this.helpers.normalize(recipe.appliance).includes(keyword) ||
          this.helpers.normalize(recipe.description).includes(keyword) ||
          recipe.ustensils.some((x) =>
            this.helpers.normalize(x).includes(keyword)
          ) ||
          recipe.ingredients.some((y) =>
            this.helpers.normalize(y.ingredient).includes(keyword)
          )
        );
      });

      if (!matchKeywords) {
        return false;
      }
      return true;
    });
  }

  testPerformanceFilteredRecipes(recipesList, keywordsInput) {
    this.filteredArray = recipes;
    recipesList = this.filteredArray;

    const testCases = [
      ["coulis", "tomate"],
      ["dfgjgds", "tomate"],
      ["creme", "coco", "limonade"],
    ];

    console.time("testPerformanceFilteredRecipes");
    let start = performance.now();
    for (let i = 0; i < 1000; i++) {
      testCases.map((testCase) => {
        const filteredRecipes = this.recipesSearchWithFilter(
          testCase,
          recipesList
        );
      });
    }
    let end = performance.now();

    console.log(`${1000 * testCases.length} recherches effectuées`);
    console.timeEnd("testPerformanceFilteredRecipes");
    console.log(`Temps d'exécution ${end - start}ms`);
  }
}

export default Search;

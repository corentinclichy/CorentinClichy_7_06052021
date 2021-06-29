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
  }

  filterSearch() {
    const searchFilterItem = this.filteredArray.filter((word) =>
      this.helpers.normalize(word).includes(this.helpers.normalize(this.input))
    );

    return searchFilterItem;
  }

  ListOfAllKeyWords() {
    let allKeywords = new Set();

    this.filteredArray.forEach((recipe) => {
      const recipeName = recipe.name;
      const recipeDescription = recipe.description;

      const recipeNameSplit =
        this._splitAndTakeOffStopWordsAndPushToGlobalArray(
          recipeName,
          allKeywords
        );

      const recipeDescriptionSplit =
        this._splitAndTakeOffStopWordsAndPushToGlobalArray(
          recipeDescription,
          allKeywords
        );
    });

    const keywordsArray = [...allKeywords];

    const keywordsString = keywordsArray.join(" ");
    console.log(keywordsString);

    const subStringKeywords = this._buildSubString(keywordsString);

    console.log(subStringKeywords);
  }

  _splitAndTakeOffStopWordsAndPushToGlobalArray(string, setList) {
    const stringNormalized = this.helpers.normalize(string);
    const stringArray = stringNormalized.split(" ");
    const stringArrayWhitoutStopWords =
      this.helpers.KeywordsWhitoutStopWords(stringArray);

    stringArrayWhitoutStopWords.map((item) => {
      setList.add(item);
    });
    return setList;
  }

  recipesSearchWithFilter() {
    let filterKeywordsNorm;
    let filterKeywordsNormArray = [];

    let keywordsArray;
    // get input and filter keywords
    const inputKw = this.input.split(" ");
    let inputKwNorm = [];

    inputKw.forEach((inputkw) => {
      inputKwNorm.push(this.helpers.normalize(inputkw));
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

    console.log(keywordsArray);

    let updatedRecipes = [];

    keywordsArray.forEach((keyword) => {
      if (keyword !== "") {
        this.filteredArray.forEach((recipe) => {
          const recipeName = this.helpers.normalize(recipe.name);
          const recipeNameWhitoutStopWords =
            this.helpers.recipeParameterWithoutStopWords(recipeName);

          const recipeDescription = this.helpers.normalize(recipe.description);
          const recipeDescriptionWhithoutStopWords =
            this.helpers.recipeParameterWithoutStopWords(recipeDescription);

          const recipeAppliance = this.helpers.normalize(recipe.appliance);
          const recipeApplianceWhithoutStopWords =
            this.helpers.recipeParameterWithoutStopWords(recipeAppliance);

          if (
            recipeNameWhitoutStopWords.includes(keyword) ||
            recipeDescriptionWhithoutStopWords.includes(keyword) ||
            recipeApplianceWhithoutStopWords.includes(keyword)
          ) {
            console.log("is in title");
            return updatedRecipes.push(recipe);
          }

          recipe.ingredients.forEach((ingredient) => {
            const ingredientName = this.helpers.normalize(
              ingredient.ingredient
            );
            const ingredientNameWithoutStopWords =
              this.helpers.recipeParameterWithoutStopWords(ingredientName);

            if (ingredientNameWithoutStopWords.includes(keyword)) {
              return updatedRecipes.push(recipe);
            }
          });

          recipe.ustensils.forEach((ustensile) => {
            const ustensileName = this.helpers.normalize(ustensile);
            const ustensileNameWithoutStopWords =
              this.helpers.recipeParameterWithoutStopWords(ustensileName);

            if (ustensileNameWithoutStopWords.includes(keyword)) {
              return updatedRecipes.push(recipe);
            }
          });
        });
      }
    });

    console.log(updatedRecipes);

    return updatedRecipes;
  }
}

export default Search;

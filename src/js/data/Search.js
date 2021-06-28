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

    console.log(this.badges);

    this.badges.length > 0
      ? this.badges.forEach((badge) => {
          const filterNameString = this.helpers.normalize(badge.innerText);
          filterKeywordsNorm = filterNameString.split(" ");
          console.log(filterKeywordsNorm);

          filterKeywordsNorm.map((keyword) => {
            filterKeywordsNormArray.push(keyword);
          });

          console.log(filterKeywordsNormArray);

          keywordsArray = [...inputKwNorm, ...filterKeywordsNormArray];
        })
      : (keywordsArray = [...inputKwNorm]);

    console.log(keywordsArray);

    //filtre avec l'ensemble des keyword
    const updatedRecipes = this.filteredArray.filter((sortBy) => {
      const matchKeywords = keywordsArray.every((keyword) => {
        const normalizedName = this.helpers.normalize(sortBy.name);
        const normalizedDescription = this.helpers.normalize(
          sortBy.description
        );
        const normalizedAppliance = this.helpers.normalize(sortBy.appliance);
        return (
          normalizedName.includes(keyword) ||
          normalizedAppliance.includes(keyword) ||
          normalizedDescription.includes(keyword) ||
          sortBy.ustensils.some((x) =>
            this.helpers.normalize(x).includes(keyword)
          ) ||
          sortBy.ingredients.some((y) =>
            this.helpers.normalize(y.ingredient).includes(keyword)
          )
        );
      });

      if (!matchKeywords) {
        return false;
      }
      return true;
    });

    return updatedRecipes;
  }
}

export default Search;

import Helpers from "../utils/helpers.js";

class Search {
  //this.input @string
  //this.tags @Array
  constructor(input, filteredArray) {
    this.input = input;
    this.filteredArray = filteredArray;
    this.helpers = new Helpers();
  }

  filterSearch() {
    const searchFilterItem = this.filteredArray.filter((word) =>
      this.helpers.normalize(word).includes(this.helpers.normalize(this.input))
    );

    return searchFilterItem;
  }

  _get;
}

export default Search;

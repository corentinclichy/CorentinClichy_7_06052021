import Helpers from "../utils/helpers.js";

class Search {
  //this.input @string
  //this.tags @Array
  constructor(input, tags) {
    this.input = input;
    this.tags = tags;
    this.helpers = new Helpers();
  }

  listOfKeywords(input, tags) {
    tags.map((tag) => {
      this.helpers.normalize(tag);
    });
  }
}

export default Search;

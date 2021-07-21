import stopWordsFr from "../data/stop_words_french.js";

/**
 * @description
 * Class to handle different opérations on strings
 * */
class Helpers {
  /**
   * @description
   * Method to normalize the string
   * @return {string}

   **/
  normalize(str) {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    // Remove Accent
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Remove ponctuation
    str = str.replace(regex, " ").toLowerCase().trim();

    return str;
  }

  /**
   * @param {array} Array of string
   * @description
   * Method to remove stop words from a array of words
   * @return {Array}
   **/
  keywordsWhitoutStopWords(keywordsArray) {
    return keywordsArray.filter((item) => !stopWordsFr.includes(item));
  }

  /**
   * @param {string} string
   * @description
   * Method to remove stop words from a string
   * @return {string}
   * */
  recipeParameterWithoutStopWords(string) {
    // Split the string into an array of words
    // and remove the stop words
    // Then join the array back into a string
    return string
      .split(" ")
      .filter((item) => !stopWordsFr.includes(item))
      .join(" ");
  }
}
export default Helpers;

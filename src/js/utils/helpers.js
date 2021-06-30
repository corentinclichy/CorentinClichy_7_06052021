import stopWordsFr from "../data/stop_words_french.js";

class Helpers {
  constructor(str) {
    this.string = str;
    this.stopWords = stopWordsFr;
  }

  normalize(str) {
    // const map = {
    //   "-": " ",
    //   "-": "_",
    //   " ": "'",
    //   a: "á|à|ã|â|ä|À|Á|Ã|Â|Ä",
    //   e: "é|è|ê|ë|É|È|Ê|Ë",
    //   i: "í|ì|î|ï|Í|Ì|Î|Ï",
    //   o: "ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö",
    //   u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
    //   c: "ç|Ç",
    //   n: "ñ|Ñ",
    // };

    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    // for (var pattern in map) {
    //remove Accent
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    //remove ponctuation
    str = str.replace(regex, " ");
    str = str.toLowerCase();
    str = str.trim();
    //
    return str;
  }

  KeywordsWhitoutStopWords(keywordsArray) {
    return keywordsArray.filter((item) => !stopWordsFr.includes(item));
  }

  recipeParameterWithoutStopWords(string) {
    const stringArray = string.split(" ");
    const stringArrayWithoutStopWords = stringArray.filter(
      (item) => !stopWordsFr.includes(item)
    );

    const stringArrayAsAString = stringArrayWithoutStopWords.join(" ");
    return stringArrayAsAString;
  }
}
export default Helpers;

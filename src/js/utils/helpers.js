class Helpers {
  constructor(str) {
    this.string = str;
  }

  normalize(str) {
    const map = {
      "-": " ",
      "-": "_",
      " ": "'",
      a: "á|à|ã|â|ä|À|Á|Ã|Â|Ä",
      e: "é|è|ê|ë|É|È|Ê|Ë",
      i: "í|ì|î|ï|Í|Ì|Î|Ï",
      o: "ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö",
      u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
      c: "ç|Ç",
      n: "ñ|Ñ",
    };

    for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], "g"), pattern);
      str = str.toLowerCase();
    }

    return str;
  }
}
export default Helpers;

const arr = [
  "pomme de terre",
  "haricot",
  "pomme",
  "fraise",
  "framboise",
  "framboisier",
];

const stopwords = ["de"];

function removeStopWords(string) {
  console.log(string);
  const splicedString = string.split(" ");

  console.log(splicedString);

  splicedString.map((word) => {
    if (stopwords.includes(word)) {
      console.log(word);
      console.log(splicedString.indexOf(word));

      const keywords = splicedString.filter((el) => el !== word);
      console.log(keywords);
    }
  });
}

const createHashMap = (arr) => {
  const hashmap = new Map();

  for (let i = 0; i < arr.length; i++) {
    hashmap.set("pom", [...arr, arr[i]]);
  }

  console.log(hashmap);
};

createHashMap(arr);

removeStopWords(arr[0]);

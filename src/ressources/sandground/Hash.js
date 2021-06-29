function chunkIt(str, chunk) {
  var words = str.split("");
  var arr = [];
  for (var i = chunk - 1; i < words.length; i++) {
    var start = i - (chunk - 1);
    arr.push(words.slice(start, start + chunk));
  }
  return arr.map((v) => v.join(" "));
}

var test = 'I love you so much, but Joe said "he doesn\'t"!';
console.log(chunkIt(test, 3));
console.log(chunkIt(test, 3));
console.log(chunkIt(test, 4));

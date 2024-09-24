// capitalize;
// function capitalize(sentence) {
//   const array = sentence.split(" ");
//   let emptyArray = [];
//   for (let i = 0; i < array.length; i++) {
//     emptyArray.push(array[i].slice(0, 1).toUpperCase() + array[i].slice(1));
//   }

//   let csentence = emptyArray.join("_");
//   console.log(csentence);
//   return csentence;
// }

// capitalize("my name is lokesh");

// function reverse(sent) {
//   let emptyArray = [];
//   let sentArray = sent.split(" ");
//   console.log(sentArray);
//   for (i = sentArray.length - 1; i >= 0; i--) {
//     console.log(i);
//     emptyArray.push(sentArray[i]);
//   }
//   let reversesent = emptyArray.join(" ");
//   return reversesent;
// }

// console.log(reverse("my name is lokesh"));

function repeat(word) {
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < word.length; j++) {
      if (i == j) {
        break;
      }
    }
  }
}

console.log(repeat("aabcdd"));


const input = require("readline-sync");

//the original old point structure object
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

//original old scrabble scorer
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

//initial prompt to user gets input and allows only letters and spaces
function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   let userInput = input.question ("Enter a word to score: ");
   //Regular expression that looks for letters and spaces. Case insensitive.
   if(!/^[a-z\s]+$/i.test(userInput)) {
      console.log("Invalid input. Try again.");
      userInput = initialPrompt();
   }
   return userInput;
};

//simple scorer function that adds one point for all letters. Adds 0 for spaces.
let simpleScorer = function (word) {
   word = word.toUpperCase();
   let points = 0;
   for (let i = 0; i < word.length; i++) {
      if(word[i] === ' '){
         points += 0;
      } else {
      points++;
      }
   }
   return points;
   };

// fucntion that looks for vowels and adds 3 points for them. 
//Adds 0 for space and one for consonants   
let vowelBonusScorer = function (word) {
      let vowels = ['A', 'E', 'I', 'O', 'U'];
      let points = 0;
      for (let j = 0; j < word.length; j++) {
         if (vowels.includes(word[j].toUpperCase())) {
            points += 3;
         } else if (word[j] === ' '){
            points+= 0;
         } else {
            points ++;
         }
      }
      return points;
   };

//function takes in word and new point structure to score letters
let scrabbleScorer = function (word, newPointStructure) {
	let points = 0;
	for(let i = 0; i < word.length; i++) {
      if(newPointStructure.hasOwnProperty(word[i].toLowerCase())){
      points += newPointStructure[word[i].toLowerCase()];
      }
   }
	return points;
};

const scoringAlgorithms = [
   {  name: "Simple score",
      description: "Each is worth 1 point",
      scoreFunction: "A function with a parameter for user input that returns a score.",
      scorerFunction: simpleScorer,
   },
   {  name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoreFunction: "A function that returns a score based on the number of vowels and consonants",
      scorerFunction: vowelBonusScorer}, 
   {  name: "Scrabble",
      description: 'The traditional scoring algorithm',
      scoreFunction: "Uses the oldScrabbleScorer() function to determine the score for a given word.",
      scorerFunction: scrabbleScorer,
}];

function scorerPrompt(word) {
//Outputs for user
  console.log('Which scoring algorithm would you like to use?\n')
  console.log('0 - Simple: One point per character');
  console.log('1 - Vowel Bonus: Vowels are worth 3 points');
  console.log('2 - Scrabble: Uses scrabble point system');
//Receives user input
  let scoreSelection = input.question('Enter 0, 1, or 2: ');
//Selects scoring system based on user input
  if(Number(scoreSelection) === 0) {
   console.log("You've selected simple scoring");
   console.log(`Score for '${word}' is ${scoringAlgorithms[0].scorerFunction(word)}.`);
  } else if (Number(scoreSelection) === 1){
   console.log("You've selected vowel bonus scoring"); 
   console.log(`Score for '${word}' is ${scoringAlgorithms[1].scorerFunction(word)}.`);
  } else if(Number(scoreSelection)=== 2){
   console.log("You've selected scrabble scoring");
   console.log(`Score for '${word}' is ${scoringAlgorithms[2].scorerFunction(word,newPointStructure)}`);
   }
   else {
//recalls function based on invalid user input
   console.log("That's not a valid selection try again.\n")
   scorerPrompt(word);
  }
  return word;
};

//transforms old point structure to make letters keys and points values
function transform(oldPointStructure) {
   let tempStructure = {};
//iterates through points
   for(const points in oldPointStructure){
      for(const letter of oldPointStructure[points]){
   //adds letter and then points to tempstructure
        tempStructure[letter.toLowerCase()] = Number([points]);    
      }
   }
   //alphabetizes the objects. Not necessary just wanted to.
   tempStructure =  Object.fromEntries(Object.entries(tempStructure).sort());
   return tempStructure;
};

//setting new point structure equal to transformed old point structure
let newPointStructure = transform(oldPointStructure);
//adds ' ' to new point structure
newPointStructure[' '] = 0;

//lines to run program
function runProgram() {
   scorerPrompt(initialPrompt());
   newPointStructure;
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

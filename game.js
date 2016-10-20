/*
* game.js
*/

//find random word
//start a game loop that ends with either 'quit' or guesses = 0

var word = require("./word.js");
var fs  = require("fs");


module.exports = game;

function game(){
    this.randomWords = [];
    this.currentWord = "";
    this.word = null; 
    this.randomWords = fs.readFileSync("random-words.txt").toString().split('\n');      //load the random words from a file into the array
}

game.prototype.start = function() {
	this.currentWord = getNewWord(this.randomWords);  //gets a new random word
	this.word = new word(this.currentWord);  // this starts the 'magic', create the word object using constructor method
}

game.prototype.guess = function(l) {
	this.word.guessLetter(l);
}

game.prototype.displayBoard = function() {
	//this.word.displayBoard();
	var str="";
    for(i=0; i<this.word.letters.length; i++){
       str = str + this.word.letters[i].displayLetter() + " "; 
  	}
  
  console.log("------------------------------------------------------------------");
  console.log(" Hidden Word: " + str + "   (Guesses left: " + this.word.guessCount + ")");
  console.log(" ");
  console.log(" Already guessed: " + this.word.incorrectLetters);
  console.log("------------------------------------------------------------------");

}


game.prototype.remainingGuesses = function() {
	return this.word.guessCount;
}

function getNewWord(arrayOfWords){
		var randomIndex = Math.floor(Math.random()*arrayOfWords.length);
		return arrayOfWords[randomIndex].trim();     
}


/*---------------------------------------------------
* word.js
* RJF
*
* contains all methods used to guess letters against
* a given word
// --------------------------------------------------- */
var letter = require("./letter.js");

// Public :  word class
module.exports = word;

//CONSTRUCTOR: stores the random word in [name] and creates and array of letters initiatlized at "_"
function word(newWord) {  
    if(!newWord)  //if null, just leave
      return;
    
    this.guessCount = 6;   //typical hangman guess count = 6;
    this.name = newWord;   //holds the name of the random word
        
    this.letters = [];     //array of 'letter' objects as defined in letter.js
    this.incorrectLetters = [];  // array that holds the incorrect letters 
    this.wordSolved = false;   //start with the word is unsolved i.e. all letter display values are  _ _ _ _ _
    var str = this.name.split('');
    for(i=0; i<str.length; i++){
        this.letters.push( new letter(str[i]) );  //important line: creates an array of letter objects representing the word
    }
}

/*------------------------------------------------------------------------------------------------------------
guessLetter: checks the letter passed in against the random word and when it
             finds a match, replaces the 'display' field in the letters array from "_" to the actual letter
--------------------------------------------------------------------------------------------------------------*/
word.prototype.guessLetter = function(guess) {

  var j = this.letters;  //j holds the array of letters making up the random word i.e. [H][E][L][L][O]
  var found = false;

  if(!guess)  //if null, don't go any further
     return;

   if(this.incorrectLetters.indexOf(guess) >= 0)  //if user already guessed letter, don't count it again
     return;

  //loop thru the j array of letters and when u find a value that matches the guess, change the "_" to the letter itself
  for(i=0; i<j.length; i++){
   if( j[i].name == guess ){
          j[i].display = j[i].name; //Important line!  Changes the "_" to the actual letter when user answers correctly
          found=true;
        } 
    }
 
  if(!found){
      this.incorrectLetters.push(guess);  //add the incorrect letters to the array
      this.guessCount--;
      return;
   }
  
  if(found){  //check to see if the entire word is uncovered
    var s = this.name;
    this.wordSolved = checkForWin(j, s);
  }
}

/*------------------------------------------------------------------------------------------------------------
checkForWin: Checks if the valid hangman word (myword) matches all of the individual 'display' letters in 
             in the letters array.  Example: "bottle" <> "b_ttl_" until all the display values are uncovered
--------------------------------------------------------------------------------------------------------------*/
function checkForWin(lettersArray, myword){
   var strGuesses="";
   for(i=0; i<lettersArray.length; i++){
        strGuesses = strGuesses + lettersArray[i].display;
       }
    
       if(strGuesses==myword)
         return true;
       else
          return false;
}


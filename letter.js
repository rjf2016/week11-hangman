
// Public :  letter class
module.exports = letter;

function letter(guess) {
    this.name = guess;  //letter guessed
    this.display = "_";  //default to _  (not guessed) 
}
letter.prototype.displayLetter = function(){
    return this.display;
}

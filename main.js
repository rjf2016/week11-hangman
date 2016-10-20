/*---------------------------------------------------
* main.js
* RJF
*
* Sets up the Game Object
* Waits for user input
* Controls the start/end of the game
// --------------------------------------------------- */
var readline = require('readline');
var game = require("./game.js");


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var g = new game();
g.start();

var gameoverFlag=false; //starting the game, so set gameover = false


// This is the call back when user presses a key from the console window.
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
   	 process.exit();  // end game on ctrl+c
  } else {
  
  		if(key.name.length > 1)  //quick check: if [enter] or [tab] etc...break out
  			return;
  
		g.guess(key.name);  //Pass the input to our game object (TODO: validate that it's a valid character not an [enter] key or number, etc.)
		
		process.stdout.write('\033c');  //clear console. Looks neater than scrolling!

		g.displayBoard();  //game.js module displays the no-frills hangman screen  


  		if(gameoverFlag){
  			if(key.name=='n')
  				process.exit();
  			else{
  				gameoverFlag=false;  
  				g = new game();
  				g.start();
  				process.stdout.write('\033c');  //clear console
				g.displayBoard();
  			}
  		}


		if(g.word.wordSolved == true){
			gameoverFlag=true;  //set to true since we've come to a decision in the game
			console.log("You Won!!!  Play again (y/n)?");
		}

		if(g.remainingGuesses() <= 0){
			gameoverFlag=true;  //set to true since we've come to a decision in the game
			console.log("You Lost that one!  Play again (y/n)?");
		}	   		

		if(!gameoverFlag)
			console.log('Enter a letter (or ctrl+c to leave game): ');
		}

 // }
});

//Runs at start of game
process.stdout.write('\033c');  //clear display
g.displayBoard();
console.log('Enter a letter (or ctrl+c to leave game): ');


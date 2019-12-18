
 class Word {

 	constructor(){
 		this.words = ['witcher', 'grandpa', 'spiderman', 'mariokart', 'koala', 'touring', 'starwars', 'princess']

 	}


 	pickWord(){
 		const index = Math.floor(Math.random() * this.words.length)
 		return this.words[index]
 	}

 }













const game = {
    guesses: [],
    guessRemain: 8,
    pause: true,
    inputGuess: function(letter) {
        if (!this.pause) {

            this.guesses.push(letter)
            this.displayGuess()
            this.useGuess()
        }
        


    },
    displayGuess: function() {

        const guessesUl = $('.user-list')
        guessesUl.html('')
        const guessText = $(`<li> Guesses = </li>1`)
        guessesUl.append(guessText)


        if (this.guesses.length > 0) {
            this.guesses.forEach(letter => {

                const letterLi = $('<li>').attr('class', 'guess').text(letter)
                guessesUl.append(letterLi)
            })

        }

    },
    togglePause: function(){

    	this.pause = !this.pause
    	this.pause ? $('#pause').text('Paused') : $('#pause').text('Click To Pause')



    	
    },
    useGuess: function (){

    	this.guessRemain--
    	

    	if (this.guessRemain > 0){
    		$('#guess-number').text(this.guessRemain)
    	}
    	else {

    		$('#guess-number').text('0, You Lose!')
    	}

    },
    initiateGame: function(){

    	const wordPick = new Word()
    	const word = wordPick.pickWord()
    	console.log(word)

    }

// Track and inform user of guessed letters and guesses remaining
}

game.initiateGame()

// Letters must be guessed with keypresses **

// User loses after 7 or 8 guesses*
// You must be able to win or lose one round (either guess word correctly or die trying).
// You must have a game object, a Word class, and event listeners/handlers.
// There must be no other code in the global scope, everything goes in either the game object, the Word class (or the Letter class if you decide to create one), or event listeners/handlers.
// Declare your array (wordBank) of possible words in a separate file, linked up in the html before the main app.js file.
// You may use either plain vanilla JavaScript or jQuery for all event handling and DOM manipulation, but not both.













// onkey press, the console should log the key


$(document.body).keydown((e) => {

    const keyCode = $(e.which)
    const char = String.fromCharCode(keyCode[0])
    if( game.guessRemain !== 0){

    	 game.inputGuess(char)
    }
   


})

$(document.body).click(() => {

	game.togglePause()
})
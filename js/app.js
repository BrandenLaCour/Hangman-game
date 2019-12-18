
 class Word {

 	constructor(){
 		this.words = words

 	}


 	pickWord(){
 		const index = Math.floor(Math.random() * this.words.length)
 		return this.words[index]
 	}

 }













const game = {
    guesses: [],
    word: '',
    gameStarted: false,
    guessRemain: 8,
    pause: true,
    startGame: function(){
    
    	this.initiateGame()
    	this.gameStarted = true;

    },
    inputGuess: function(letter) {


        if (!this.pause) {

            this.guesses.push(letter)
            this.displayGuess()
            this.useGuess()
            this.matchCheck(letter)
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
    	
// Track and inform user of guessed letters and guesses remaining
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
    	this.word = word
    	this.displayWord(word)

    },
    displayWord: function(word){

    	const wordUl = $('.game-word')
    	// create each letter by splitting the word into an array, 
    	const wordArr = word.split('')
    	// afterward, place each letter as an attribute into each li
    	wordArr.forEach(letter => {
    		const hiddenLi = $(`<li id='${letter}'>__<li> `).css({'text-decoration': 'underline'})
    		wordUl.append(hiddenLi)
    	})
    	// underline each li, attempt to display this
    	//now i need to display each letter of the word hidden with an underline


    },
    matchCheck: function(l){
    	console.log(this.word)
    
    	const letters = $(`#${l}`)
    	
    	// idea is to directly search for the letter within li id's <-- this works! no looping!
    	// to display, now grab the attribute, then change inner text to its letter to uppercase
    	


    }
    //now i need to run each guess through a check, and see if we find a match *
    // if so, display the letter on screen


}

//no code in the global scope









// onkey press, the console should log the key


$(document.body).keydown((e) => {

	


    const keyCode = $(e.which)
    const char = String.fromCharCode(keyCode[0])
    if( game.guessRemain !== 0){

    	 game.inputGuess(char.toLowerCase())
    }
   


})

$(document.body).click(() => {

 	if (game.gameStarted === false) game.startGame()
	game.togglePause()
})
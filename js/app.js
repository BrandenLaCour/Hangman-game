class Word {

    constructor() {

        this.gameWord = words[Math.floor(Math.random() * words.length)]

    }

}



// I went with the initial challenge of trying to do this without guidance. Let me know what you think. (This is why my word class is different)
// I did read afterwards how the word class was instructed. Definitely a more elegant solution! haha








const game = {
    guesses: [],
    word: '',
    gameStarted: false,
    guessRemain: 8,
    pause: true,
    guessed: '',
    startGame: function() {

        this.initiateGame()
        this.gameStarted = true;

    },
    displayGuess: function() {

        const guessesUl = $('.user-list')
        guessesUl.html('')
        const guessText = $(`<li> Guesses = </li>1`)
        guessesUl.append(guessText)


        if (this.guesses.length > 0) {
            this.guesses.forEach(letter => {

                const letterLi = $('<li>').attr('class', 'guess').text(`${letter},`)
                guessesUl.append(letterLi)
            })

        }

    },
    togglePause: function() {

        this.pause = !this.pause
        this.pause ? $('#pause').text('Paused') : $('#pause').text('Click To Pause')




    },
    useGuess: function() {

        this.guessRemain--

        // Track and inform user of guessed letters and guesses remaining
        if (this.guessRemain > 0) {
            $('#guess-number').text(this.guessRemain)
            $('.face').text('(⌣̩̩́_⌣̩̩̀)')
        } else {
            $('#guess-number').text('0')
            const userList = $('.user-list').html('') 
            userList.html('<h1>Ughh! You Died!</h1>')
            $('.face').text('ಥ_ಥ')
        }

    },
    initiateGame: function() {


        const wordPick = new Word()
        const word = wordPick.gameWord
        this.word = word
        this.displayWord(word)

    },
    displayWord: function(word) {

        const wordUl = $('.game-word')
        // create each letter by splitting the word into an array, 
        const wordArr = word.split('')
        // afterward, place each letter as an attribute into each li
        wordArr.forEach(letter => {
            const hiddenLi = $(`<li id='${letter}'>__<li> `).css({ 'text-decoration': 'underline' })
            wordUl.append(hiddenLi)
        })
        // underline each li, attempt to display this
        //now i need to display each letter of the word hidden with an underline


    },
    matchCheck: function(l) {


        if (!this.pause) {

            const lettersFind = $(`#${l}`).attr('id')
            // need to troubleshoot finding the same element. maybe remove the elements id once found (or change it)

            if ((typeof lettersFind) == 'string') {
                const letterLi = $(`#${l}`)
                letterLi.text(l)
                letterLi.attr('id', l.toUpperCase())
                this.guessed += l
                this.winCheck()

            } else {
                this.guesses.push(l)
                this.displayGuess()
                this.useGuess()



            }



        }

        // i now need win condition
        // first i can check the length of the word in the app, then i can concat each word entered into a 'guessed' category.

        // idea is to directly search for the letter within li id's <-- this works! no looping!
        // to display, now grab the attribute, then change inner text to its letter to uppercase

    },
    winCheck: function() {
        console.log(this.word)
        if (this.guessed.length === this.word.length) {
            
            const userList = $('.user-list').html('')
            userList.html('<h1>CONGRATS! YOU WIN!</h1>')
             $('.face').text('↖(^▽^)↗')
        }
        else{
            $('.face').text('ʘ‿ʘ')
        }
        


    }
    //now i need to run each guess through a check, and see if we find a match *
    // if so, display the letter on screen


}

//no code in the global scope









// onkey press, the console should log the key


$(document.body).keydown((e) => {


    const keyCode = $(e.which)
    const char = String.fromCharCode(keyCode[0])
 
    if (game.guessRemain !== 0) {

        game.matchCheck(char.toLowerCase())
    }



})

$(document.body).click(() => {

    if (game.gameStarted === false) game.startGame()
    game.togglePause()
})
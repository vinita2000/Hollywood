
$("#popup-container").hide();
const wordEl = document.getElementById('blanks');

const movieNames = ["avatar","maleficent","jumanji","brave","gravity","skyfall","freaks","misery","jaws","titanic","batman","moana"];

let selectedMovie = movieNames[Math.floor(Math.random() * movieNames.length)];
    
const correctLetters = [];
const wrongLetters = [];
    
//display word
function displayMovie()
{
    $("#blanks").html(`
        ${selectedMovie
            .split('')
            .map(letter => `
                <div class="blank">
                    ${correctLetters.includes(letter) ? letter : '__'}
                </div>
            `
            ).join('')}
    `);
        
    let innerWord = wordEl.innerText.replace(/\n/g,'');
        
    if(innerWord === selectedMovie)
    {
        $("#final-message").text("Congratulations! You Won :)");
        $("#popup-container").show();
    }
}

//notify on wrong letter
function showNotification()
{
    $("#notification-message").text("You have already entered this letter !");
    $("#notification-container").addClass("show");

    setTimeout(() => {
        $("#notification-container").removeClass("show");
    },2000);

}
//notify update wwrong letters dom
function updateWrongLetters()
{
    //cross the letter
    var str = "letter" + wrongLetters.length;
    $("#" + str).addClass("crossed");

    //display on the dom
    $("#wrong-letters").html(`
        ${wrongLetters.length > 0 ? '<p class="wrong-letter">Wrong Letters</p>': ''}
        ${wrongLetters.map(letter => `<span class="wrong-letter">${letter}</span>`)}
    `);
}

//keydown event
$("body").on('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90)
    {
        const letter = e.key;
        if(selectedMovie.includes(letter.toLowerCase()))
        {
            if(!correctLetters.includes(letter.toLowerCase())){
                correctLetters.push(letter.toLowerCase());
                displayMovie();
            }
            else{
                //show notification
                showNotification();
            }
        }
        else
        {
            if(!wrongLetters.includes(letter.toLowerCase()))
            {
                wrongLetters.push(letter.toLowerCase());
                //update wrong letter dom
                updateWrongLetters();
                if(wrongLetters.length === 9){
                    //end game start over
                    $("#final-message").text("Unfortunately You lost");
                    $("#popup-container").show();
                }
            }
            else
            {
                //show notification
                showNotification();
            }        
        }
    }
});

//play again
$("#play-again").on('click', function(){
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedMovie = movieNames[Math.floor(Math.random() * movieNames.length)];

    //uncross the letters
    $(".hollywood").removeClass("crossed");

    displayMovie();

    updateWrongLetters()

    $("#popup-container").hide();
});

displayMovie();




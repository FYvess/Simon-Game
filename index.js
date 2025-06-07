const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

var started = false;
var level = 0;

function nextfunction(){
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    $("h1").text("Level "+ level);

    var randomChosenColor = buttonColors[nextfunction()];
    gamePattern.push(randomChosenColor);
    
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function makeSound(color) {
    var audio = new Audio('sounds/'+ color + '.mp3');
    audio.play();
}

function animatePress(color){
    $("#"+ color).fadeOut(100).fadeIn(100);
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(event){
	if(!started){
        started = true;
        console.log(event.key);
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            console.log("successsuccess");
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("fail");
        makeSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    started = false;
}
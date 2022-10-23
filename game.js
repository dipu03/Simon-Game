let buttonColor = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;


// Step - 1. Generate Random Number
function nextSequence(){
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosColor);
    $("#" + randomChoosColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosColor)
}


// Step - 2. Play sound
function playSound(color){
    let audio = new Audio("sounds" + "/" + color + ".mp3");
    audio.play()
}

// step -3 If user press any key then game will start
$(document).keypress(function (){
    if(!started){
        nextSequence()
        started = true;
    }
})

//Step - 4. Now what we do when user click the button
$(".btn").click(function(){
    let clickedButtonColor = $(this).attr("id");
    playSound(clickedButtonColor);
    $("#" + clickedButtonColor).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log(clickedButtonColor);
    userClickedPattern.push(clickedButtonColor);
    matchColor(userClickedPattern.length-1)

})

// Step - 5. Now play the Game
function matchColor(level){
    if(gamePattern[level] === userClickedPattern[level]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=> {
                nextSequence()
            }, 1000)
            
        }
    }else{
       playSound("wrong") 
       $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press any key to Restart")

       setTimeout(() => {
        $("body").removeClass("game-over");
       }, 100);

       startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = []
    started = false
}
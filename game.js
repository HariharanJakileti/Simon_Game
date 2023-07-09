
gamePattern=[];

buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[];

var started=false;

var level=0;

$(document).keydown(function(){
  
    if(!started){
      $("h1").text("Level "+level);
      nextSequence();
      started=true;
    }

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();},1000);
        }
    }
    else{
        play("wrong");
        $("h1").text("Game Over! Press any key to continue");
        $("body").addClass("game-over");

        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    play(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    play(randomChosenColour);

}


function animatePress(colour){
 
    $("#"+colour).addClass("pressed");

    setTimeout(function(){$("#"+colour).removeClass("pressed")},100);

}


function play(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}



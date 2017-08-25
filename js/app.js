var game = new RgbMatching();

var audioBackground = new Audio("./sounds/piano_background.wav");
var redpanelAudio = new Audio("./sounds/sound_red.wav");
var greenpanelAudio = new Audio("./sounds/sound_green.wav");
var bluepanelAudio = new Audio("./sounds/sound_blue.wav");

redpanelAudio.volume = 0.7;
bluepanelAudio.volume = 0.7;
greenpanelAudio.volume = 0.7;

audioBackground.loop = true;

$(document).ready(function(){

  audioBackground.play();
$('#new-game').click(function(){
  audioBackground.volume = 0.65;
  game.colorCenter = [];
  game.colorCorrect = [];

  if($("h2").hasClass("final-score")){
    $("h2").removeClass("final-score");
    $("h2").html(game.score);
  }
  $("h2").removeClass("hidden");
  $("div").removeClass("fadeOut");
  $("div").removeClass("hidden");
  $("div").addClass("fadeIn");
  $("h2").addClass("fadeIn");
  $(".start-up").addClass("fadeOut");
  setTimeout(function(){
    $(".start-up").removeClass("fadeOut");
    $(".start-up").addClass("hidden");
    $("div").removeClass("fadeIn");
    $("h2").removeClass("fadeIn");
  },2000);
  game.bgColorChange();
});

$(".color-choice").click(function(){
  var colorOption = [0,0,0];
  var colorPanel = $(this).parent().attr("id");
  var audio = colorPanel.replace('-','') +"Audio";

  switch(colorPanel){
    case "red-panel":
      redpanelAudio.play();
    case "green-panel":
      bluepanelAudio.play();
    case "blue-panel":
      greenpanelAudio.play();
  }

  if($(this).hasClass("active")){
    $(this).removeClass("active");
    game.colorSelect[colorPanel] = false;
  }
  else{
    $(this).addClass("active");
    game.colorSelect[colorPanel] = true;
    $(this).prevAll().removeClass("active");
    $(this).nextAll().removeClass("active");
    colorOption = Color.RgbToArray($(this).css("background-color"));
  }
  game.HueAdd(colorOption, colorPanel);
});

  $("#reset").click(function(){
    game.reset();

  });
  $("#exit").click(function(){
    game.gameOver();
  });

var index;

  $("#tutorial.initial").click(function(){
    if($("#tutorial").hasClass("initial")){
      index = 0;
      $("h3").html(game.tutorial[index]);
      $("h3").removeClass("hidden");
      $(".start-up").addClass("fadeOut");
      $("h3").addClass("fadeIn");
    setTimeout(function(){
      $("#tutorial").html("Next");
      $(".start-up").removeClass("fadeOut");
      $("#tutorial").removeClass("initial");
      $("#new-game").addClass("hidden");
      $("#tutorial").addClass("fadeIn next");
      $("h3").removeClass("fadeIn");
      $("h3").removeClass("fadeIn");
    },2000);
  }
  else{
    index++;
    if($("#tutorial").hasClass("fadeIn"))
      $("#tutorial").removeClass("fadeIn");
    if(index === (game.tutorial.length - 1)){
      $("#tutorial").html("Exit");
    }
    else if(index === game.tutorial.length){
      location.reload();
    }
      $("h3").html(game.tutorial[index]);
  }
  });
});

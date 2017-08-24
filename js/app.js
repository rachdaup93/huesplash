var game = new RgbMatching();
var timer;

$(document).ready(function(){

$('#new-game').click(function(){
  timer = new Timer(10000);
  game.colorCenter = [];
  game.colorCorrect = [];
  $("h2").removeClass("hidden");
  $("div").removeClass("fadeOut");
  $("div").removeClass("hidden");
  $("div").addClass("fadeIn");
  $("h2").addClass("fadeIn");
  $(".start-up").addClass("fadeOut");
  setTimeout(function(){
    $(".start-up").removeClass("fadeOut");
    $(".start-up").addClass("hidden");
  },2000);
  setTimeout(() => {timer.CountDown()},1000);
  game.bgColorChange();
});

$(".color-choice").click(function(){
  var colorOption = [0,0,0];
  var colorPanel = $(this).parent().attr("id");

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

$("#exit").click(function(){
  game.gameOver();
});

});

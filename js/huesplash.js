var Color = new Color();
function RgbMatching() {
  this.colorCenter = [];
  this.colorCorrect = [];
  this.colorSelect = {
    "red-panel":false,
    "green-panel":false,
    "blue-panel":false};
  this.score = 0;
}

RgbMatching.prototype.bgColorChange = function() {
  var shadeArray = ['','transparent'], color;
  this.colorCorrect.push(Color.generateRandomNum(Color.COLOR_MAX));
  this.colorCorrect.push(Color.generateRandomNum(Color.COLOR_MAX));
  this.colorCorrect.push(Color.generateRandomNum(Color.COLOR_MAX));
  colorsGenerator(this);

  color = "rgb(" + this.colorCorrect.toString() + ")";
  color = Color.rgbToHex(color);
  var shade = Color.ColorLuminance(color, -0.2);
  var shadeMed = Color.ColorLuminance(color, -0.4);
  var shadeDark = Color.ColorLuminance(color, -0.8);

  shadeArray.push(shade);
  shadeArray.push(shadeMed);
  shadeArray.push(shadeDark);

  $("#bg").css("background-color", color);
  shadeArray[0] = "to right";
  var linearGrad = "linear-gradient(" + shadeArray.toString() + ")";
  $(".bg-right").css("background",linearGrad);
}

function colorsGenerator(rgbObj){
  rgbObj.colorCenter = [255,255,255];
  rgbObj.RedValue();
  rgbObj.GreenValue();
  rgbObj.BlueValue();

  var colorVal = "rgb(" + rgbObj.colorCenter.toString() + ")";
  $("#color-main").css("background-color", colorVal);

}
RgbMatching.prototype.RedValue = function () {

  var redPanelButtons, redColorList = [], redVal = this.colorCorrect[0];
  redValCorrect = "rgb(" + redVal + ",0,0)";

  redColorList.push(redValCorrect);
  redPanelButtons = $("#red-panel .color-choice");
  for(i = 0; i < redPanelButtons.length-1; i++){
    redVal = Color.numberIncrement(redVal, 50);
    redColorList.push("rgb(" + redVal + ",0,0)");
  }
  Color.shuffle(redColorList);
  for(i = 0; i < redPanelButtons.length; i++){
    $(redPanelButtons[i]).css('background-color',redColorList[i]);
  }
  console.log(redValCorrect);
};

RgbMatching.prototype.GreenValue = function (greenVal) {
  var greenPanelButtons, greenColorList = [], greenVal = this.colorCorrect[1];
  greenValCorrect = "rgb(0," + greenVal + ",0)";

  greenColorList.push(greenValCorrect);
  greenPanelButtons = $("#green-panel .color-choice");
  for(i = 0; i < greenPanelButtons.length-1; i++){
    greenVal = Color.numberIncrement(greenVal, 50);
    greenColorList.push("rgb(0," + greenVal + ",0)");
  }
  Color.shuffle(greenColorList);
  for(i = 0; i < greenPanelButtons.length; i++){
    $(greenPanelButtons[i]).css('background-color',greenColorList[i]);
  }
  console.log(greenValCorrect);
};

RgbMatching.prototype.BlueValue = function (blueVal) {
  var bluePanelButtons, blueColorList = [], blueVal = this.colorCorrect[2];
  blueValCorrect = "rgb(0,0," + blueVal + ")";

  blueColorList.push(blueValCorrect);
  bluePanelButtons = $("#blue-panel .color-choice");
  for(i = 0; i < bluePanelButtons.length-1; i++){
    blueVal = Color.numberIncrement(blueVal, 50);
    if(blueVal.length === 1)
      blueVal = '0' + blueVal;
    blueColorList.push("rgb(0,0," + blueVal + ")");
  }
  Color.shuffle(blueColorList);
  for(i = 0; i < bluePanelButtons.length; i++){
    $(bluePanelButtons[i]).css('background-color',blueColorList[i]);
  }
  console.log(blueValCorrect);
};

RgbMatching.prototype.HueAdd = function(color,colorPanel){
  var newColor = this.colorCenter, rgbVal = "rgb(";

  if($("#color-main").hasClass("initial")){
      newColor = color;
      $("#color-main").removeClass("initial");
  }
  switch(colorPanel){
    case "red-panel":
      newColor[0] = color[0];
      break;
    case "green-panel":
      newColor[1] = color[1];
      break;
    default:
      newColor[2] = color[2];
  }

  this.colorCenter = newColor;
  rgbVal += newColor.toString() +")";
  $("#color-main").css('background-color',rgbVal);
  if(Object.values(this.colorSelect).toString() === "false,false,false"){
    this.reset();
  }
  if(Object.values(this.colorSelect).toString() === "true,true,true"){
    this.checkForWin();
  }
}

RgbMatching.prototype.reset = function(){
  $(".color-choice").removeClass("active");
  this.colorSelect["red-panel"] = false;
  this.colorSelect["green-panel"] = false;
  this.colorSelect["blue-panel"] = false;
  $("#color-main").addClass("initial bg-transition");
  $("#animation-wrapper").addClass("shake");
  $("#color-main").css('background-color',"rgb(255,255,255)");
  setTimeout(function(){
    $("#animation-wrapper").removeClass("shake");
    $("#color-main").removeClass("bg-transition")
    ;},600);
}

RgbMatching.prototype.checkForWin = function (){
    var test;
    checkColor = this.colorCenter.toString();
    checkColor = checkColor.replace(/ /g, "");
    if(checkColor === this.colorCorrect.toString()){
      this.score++;
      $(".header").css("color", "rgb(" + this.colorCorrect.toString() + ")");
      $("div").addClass("fadeOut");
      $("h2.header").html(this.score);
      setTimeout(() => {
        this.colorCenter = [];
        this.colorCorrect = [];
        this.colorSelect["red-panel"] = false;
        this.colorSelect["green-panel"] = false;
        this.colorSelect["blue-panel"] = false;
      $(".color-choice").removeClass("active");
      $("#color-main").addClass("initial");
    }, 2500);
      setTimeout(() => {this.bgColorChange();}, 2500);
      setTimeout(function(){
        $("div").removeClass("fadeOut");
        $("div").addClass("fadeIn");
        $(".header").css("color", "rgb(255,255,255)");
      },2550);

      setTimeout(function(){
        $("div").removeClass("fadeIn");
      },4510);
    }
  else{
    $("#color-main").addClass("incorrect-glow");
    $("#animation-wrapper").addClass("shake");
    setTimeout(function(){$("#animation-wrapper").removeClass("shake");},600);
    setTimeout(function(){$("#color-main").removeClass("incorrect-glow");},1400);
  }
}
var game = new RgbMatching();

$('#press').click(function(){
  game.colorCenter = [];
  game.colorCorrect = [];
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

$("#reset").click(function(){
  game.reset();
});

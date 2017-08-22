var Color = new Color();
function RgbMatching() {
  this.colorCenter;
  this.colorList;
  this.colorCorrect;
}

RgbMatching.prototype.bgColorChange = function() {
  var shadeArray = ['','transparent'];
  color = Color.generateRandomNum(Color.COLOR_MAX);
  this.colorCorrect = color;
  colorsGenerator(this,3);
  color = Color.ToHexString(color);

  var shade = Color.ColorLuminance(color, -0.2);
  var shadeMed = Color.ColorLuminance(color, -0.4);
  var shadeDark = Color.ColorLuminance(color, -0.8);

  shadeArray.push(shade);
  shadeArray.push(shadeMed);
  shadeArray.push(shadeDark);

  $("body").css("background-color", color);
  shadeArray[0] = "to right";
  var linearGrad = "linear-gradient(" + shadeArray.toString() + ")";
  $(".bg-right").css("background",linearGrad);
  shadeArray[0] = "to left";
  var linearGrad = "linear-gradient(" + shadeArray.toString() + ")";
  $(".bg-left").css("background",linearGrad);
}

RgbMatching.prototype.HueAdd = function(colorMain,color,operation){
  colorMain = Color.HexToDecimal(colorMain);
  color = Color.HexToDecimal(color);
  if(operation == 1){
    colorMain += color;
    if($("#color-main").hasClass("initial")){
      colorMain = Color.ToHexString(color);
      $("#color-main").css('background-color',colorMain);
      $("#color-main").removeClass("initial");
    }
    else if(colorMain >= Color.COLOR_MAX){
      $("#color-main").css('background-color',Color.ToHexString(Color.COLOR_MAX));
      colorMain = Color.ToHexString(colorMain);
    }
    else{
      colorMain = Color.ToHexString(colorMain);
      $("#color-main").css('background-color',colorMain);
    }
  }
  else{
    colorMain -= color;
    console.log(colorMain);
    if(colorMain === 0){
      colorMain = Color.COLOR_MAX;
      $("#color-main").addClass("initial");
    }
    colorMain = Color.ToHexString(colorMain);
    $("#color-main").css('background-color',colorMain);
  }
}

function colorsGenerator(rgbObj, amount){
  var colorNum = rgbObj.colorCorrect,
  colorOption,
  colorList,
  redVal,
  greenVal,
  blueVal;
  colorList = [Color.ToHexString(colorNum)];
  redVal = colorList[0].slice(1,3);
  greenVal = colorList[0].slice(3,5);
  blueVal = colorList[0].slice(5);

  rgbObj.RedValue(redVal);
  rgbObj.GreenValue(greenVal);
  rgbObj.BlueValue(blueVal);

  for(var  i = 0; i < amount-1; i++){
    colorOption = Color.generateRandomNum(colorNum);
    colorList.push(Color.ToHexString(colorOption));
    colorNum -= colorOption;
  }
  colorList.push(Color.ToHexString(colorNum));
  rgbObj.colorList = colorList;
}
RgbMatching.prototype.RedValue = function (redVal) {
  var redPanelButtons, redColorList = [];
  redValCorrect = "#" + redVal + "0000";
  redVal = 0;

  redColorList.push(redValCorrect);
  redPanelButtons = $("#red-panel .color-choice");
  for(i = 0; i < redPanelButtons.length-1; i++){
    redVal = Color.generateRandomNum(255).toString(16);
    if(redVal.length === 1)
      redVal = '0' + redVal
    redColorList.push("#" + redVal + "0000");
  }
  Color.shuffle(redColorList);
  for(i = 0; i < redPanelButtons.length; i++){
    $(redPanelButtons[i]).css('background-color',redColorList[i]);
  }
};

RgbMatching.prototype.GreenValue = function (greenVal) {
  var greenPanelButtons, greenColorList = [];
  greenValCorrect = "#00" + greenVal + "00"
  greenVal = 0;

  greenColorList.push(greenValCorrect);
  greenPanelButtons = $("#green-panel .color-choice");
  for(i = 0; i < greenPanelButtons.length-1; i++){
    greenVal = Color.generateRandomNum(255).toString(16);
    if(greenVal.length === 1)
      greenVal = '0' + greenVal
    greenColorList.push("#00" + greenVal + "00");
  }
  Color.shuffle(greenColorList);
  for(i = 0; i < greenPanelButtons.length; i++){
    $(greenPanelButtons[i]).css('background-color',greenColorList[i]);
  }
  console.log(greenValCorrect);
};

RgbMatching.prototype.BlueValue = function (blueVal) {
  var bluePanelButtons, blueColorList = [];
  blueValCorrect = "#0000" + blueVal;
  blueVal = 0;

  blueColorList.push(blueValCorrect);
  bluePanelButtons = $("#blue-panel .color-choice");
  for(i = 0; i < bluePanelButtons.length-1; i++){
    blueVal = Color.generateRandomNum(255).toString(16);
    if(blueVal.length === 1)
      blueVal = '0' + blueVal;
    blueColorList.push("#0000" + blueVal);
  }
  Color.shuffle(blueColorList);
  for(i = 0; i < bluePanelButtons.length; i++){
    $(bluePanelButtons[i]).css('background-color',blueColorList[i]);
  }
};

RgbMatching.prototype.reset = function(){

}

var game = new RgbMatching();

$('#press').click(function(){
  setTimeout(game.bgColorChange(), 1000);
});

$(".color-choice").click(function(){
  var colorOption = Color.rgbToHex($(this).css("background-color"));
  var colorMain = Color.rgbToHex($("#color-main").css("background-color"));

  if($(this).hasClass("active")){
    $(this).removeClass("active");
    game.HueAdd(colorMain, colorOption, 0);
  }
  else{
    $(this).addClass("active");
    $(this).prevAll().removeClass("active");
    $(this).nextAll().removeClass("active");
    $(".color-choice").change(function(){
      var color = Color.rgbToHex($(this).css("background-color"));
      var Main = Color.rgbToHex($("#color-main").css("background-color"));
      if(!$(this).hasClass("active"))
        game.HueAdd(Main, color, 0);
      });
    game.HueAdd(colorMain, colorOption, 1);
  }
});

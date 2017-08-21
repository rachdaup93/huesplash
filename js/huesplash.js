var COLOR_MAX = 16581375;
function generateRandomNum(n) {
  return Math.floor(Math.random()*n);
}

function colorSimulator(colorList) {
  var colorMain,
      colorButtons,
      colorListLength,
      colorOptionList,
      colorCorrect,
      index;

  colorCorrect = HexToDecimal(colorList[0]);
  colorOptionList = colorList.slice(1);
  index = 1;
  listLastIndex = colorOptionList.length - 1;
  colorOptionList = shuffle(colorOptionList);
  colorMain = colorOptionList[0];
  $("#color-main").css('background-color',colorMain);

  colorButtons = $('.color-choice');
  for(i = 0; i < colorButtons.length; i++){
    if(index > listLastIndex){
      $(colorButtons[i]).css('background-color',ToHexString(generateRandomNum(colorCorrect)));
    }
    else {
      $(colorButtons[i]).css('background-color',colorOptionList[index]);
    }
    index++;
  }
}


function bgColorChange() {
  var shadeArray = ['','transparent'];
  var color = generateRandomNum(COLOR_MAX);
  colorsGenerator(color, 3);
  color = ToHexString(color);

  var shade = ColorLuminance(color, -0.2);
  var shadeMed = ColorLuminance(color, -0.4);
  var shadeDark = ColorLuminance(color, -0.8);

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

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = hex.replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

$('#press').click(function(){
  setTimeout(bgColorChange(), 1000);
});


function colorsGenerator(colorMain, amount){
  var colorList = [ToHexString(colorMain)];
  var colorNum = colorMain;
  var colorOption;
  for(var  i = 0; i < amount-1; i++){
    colorOption = generateRandomNum(colorNum);
    colorList.push(ToHexString(colorOption));
    colorNum -= colorOption;
  }
  colorList.push(ToHexString(colorNum));
  colorSimulator(colorList);
}

function ToHexString(colorVal){
  var colorHex = colorVal.toString(16);

  if(colorHex.length < 6){
    for(var i = 0; i < (7 - colorHex.length); i++){
    colorHex = "0" + colorHex;
    }}

  return '#' + colorHex;
}
function HexToDecimal(hex){
  hexString = hex.substr(1);
  return parseInt(hexString, 16);
}

function rgbToHex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function shuffle(array) {
    var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    return array;
}

function HueAdd(colorMain,color){
  colorMain = HexToDecimal(colorMain);
  color = HexToDecimal(color);
  colorMain += color;
  if(colorMain >= COLOR_MAX)
    colorMain = COLOR_MAX;
  colorMain = ToHexString(colorMain);
  $("#color-main").css('background-color',colorMain);
}

$(".color-choice").click(function(){
  var colorOption = rgbToHex($(this).css("background-color"));
  var colorMain = rgbToHex($("#color-main").css("background-color"));
  HueAdd(colorMain, colorOption);
});

// setInterval(bgColorChange, 5000)
// bgColorChange();

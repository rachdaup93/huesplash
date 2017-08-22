function Color(){
  this.COLOR_MAX = 16777215;
};

Color.prototype.generateRandomNum = function (n) {
  return Math.floor(Math.random()*n);
}

Color.prototype.HexToDecimal = function (hex){
  var hexString;
  if(hex[0] === '#')
    hexString = hex.substr(1);
  else
    hexString = hex;

  return parseInt(hexString, 16);
}

Color.prototype.ToHexString = function(colorVal){
  var colorHex = colorVal.toString(16);
  var hexLength = colorHex.length;

  if(colorHex.length < 6){
    for(var i = 0; i < (6 - hexLength); i++){
    colorHex = "0" + colorHex;
    }}

  return '#' + colorHex;
}

Color.prototype.rgbToHex = function(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

Color.prototype.shuffle = function(array) {
    var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    return array;
}

Color.prototype.ColorLuminance = function(hex, lum) {

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

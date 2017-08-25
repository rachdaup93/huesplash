// Update the count down every 1 second
function Timer(){
    this.TIMER_SEQUENCE = false;
    this.distance = 0;
}

Timer.prototype.CountDown = function(time, rgb){
  var distance = time;
  x = setInterval(() => {
    if(this.TIMER_SEQUENCE){
      clearInterval(x);
      $("#time").html("0:00");
      x=0;
    }
    // Time calculations for days, hours, minutes and seconds
    else{
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if(seconds < 10)
        seconds = '0' + seconds;
      // Display the result in the element with id="demo"
      $("#time").html(minutes + ":" + seconds);
      // If the count down is finished, write some text
      distance = distance - 1000;
      this.distance = distance;

      if (this.distance < 0) {
        clearInterval(x);
        rgb.passLevel();
      }
    }}, 1000);
}

Timer.prototype.clearTime = function(){
  this.TIMER_SEQUENCE = true;
}

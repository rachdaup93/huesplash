// Update the count down every 1 second
function Timer(time){
    this.theTime = time;
    this.TIMER_SEQUENCE = 0;
    this.distance = 0;
}

Timer.prototype.CountDown = function(){
  console.log("this is time: " + this.theTime);
  
  distance = this.theTime;
  this.TIMER_SEQUENCE = setInterval(function() {

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));

    var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    if(seconds < 10)
      seconds = '0' + seconds;
    // Display the result in the element with id="demo"
    $("#time").html(minutes + ":" + seconds);
    console.log(minutes + ":" + seconds);
    // If the count down is finished, write some text
    this.distance = this.distance - 1000;

    if (distance <= 0) {
      clearInterval(this.TIMER_SEQUENCE);
      console.log("EXPIRED");
    }
  }, 1000);
}

Timer.prototype.clearTime = function(){
  this.distance = 0;
}

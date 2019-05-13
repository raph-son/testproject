var mic;

function validateForm() {
    var min = document.forms["options"]["interval-min"].value;
    var max = document.forms["options"]["interval-max"].value;
    var delay = document.forms["options"]["activation-delay"].value;
     
    if((delay == "") || (delay > 60)) {
        alert("Please enter a valid delay.");
        return false;
    }

    if(min == ""){
        alert("Please enter a minimum interval value.");
        return false;
    }

    if(max == ""){
        alert("Please enter a maximum interval value.");
        return false;
    }

    if((isNaN(min)) || (isNaN(max)) || (isNaN(delay))){
        alert("Must input numbers.");
        return false;
    }
  
    if((min > max) || (min < 0) || (max < 0) || ((min - max) > 60) || ((max - min) > 60)){
        alert("Please enter a valid interval.");
        return false;
    }

    else{
        document.getElementById("timer").classList.remove('hidden'); // unhides stopwatch upon form submission
        document.getElementById("timer").classList.add('not-hidden');
        document.getElementById("submit").disabled = true; // grey out start button
        findInterval();
    }
}

function findInterval() {
    var min = document.forms["options"]["interval-min"].value;
    var max = document.forms["options"]["interval-max"].value;
    var delay = document.forms["options"]["activation-delay"].value;
    min = Math.ceil(min);
    max = Math.ceil(max);
    var result = Math.floor(Math.random() * (max - min + 1)) + min; // calculates random inclusive integer between intervals
    var total = parseInt(delay) + parseInt(result);
 
    setTimeout(doBeep, (total * 1000)); // setTimeout in ms
    event.preventDefault(); 

    function doBeep (){
        document.getElementById("display").innerHTML = total;
        callStopwatch();
    }

}

function callStopwatch() {
    var timer = document.getElementById('timer');
    var toggleBtn = document.getElementById('submit');
    var resetBtn = document.getElementById('reset');
    var watch = new Stopwatch(timer);

    watch.start();
 
 if(draw()){
        watch.stop();
    }

    resetBtn.addEventListener('click', function() {
        watch.stop();
        watch.reset();
        document.getElementById("submit").disabled = false;
    });
}

function setup() {
 mic = new p5.AudioIn();
    mic.start();
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function draw() {
    let flag = false;
    var vol = mic.getLevel();
    if(vol > 0.2){
        console.log("true"); //created to check whether sound detection is working
        flag = true;
    }
    return flag;
}

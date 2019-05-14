var mic;
var watch;

function validateForm() {
    var min = document.forms["options"]["interval-min"].value;
    var max = document.forms["options"]["interval-max"].value;
    var delay = document.forms["options"]["activation-delay"].value;
     
    if((delay == "") || (delay > 60)) {
        alert("Please enter a valid delay.");
        return false;
    }

    else if(min == ""){
        alert("Please enter a minimum interval value.");
        return false;
    }

    else if(max == ""){
        alert("Please enter a maximum interval value.");
        return false;
    }

    else if((isNaN(min)) || (isNaN(max)) || (isNaN(delay))){
        alert("Must input numbers.");
        return false;
    }
  
    else if((min > max) || (min < 0) || (max < 0) || ((min - max) > 60) || ((max - min) > 60)){
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
    watch = new Stopwatch(timer);

    watch.start();
 
 /* if(draw()){
        watch.stop();
    } */

    resetBtn.addEventListener('click', function() {
        watch.stop();
        watch.reset();
        document.getElementById("submit").disabled = false;
    });
}

/*
This is where the fix took place.
With just the setup function, it'll do
you can adjust the mic value accordingly
as you will observe on your machine.
*/
function setup() {
 mic = new p5.AudioIn();
    mic.start();
    var interval = setInterval(() => {
        let current_vol = mic.getLevel()
        console.log(current_vol)
        if (current_vol > 0.04) {
            mic.stop();
            // If we didn't start the Timer
            try {
                watch.stop();
            } catch (error) {
                console.log(error)
            }
            console.log("clear")
            clearInterval(interval);
        }
    }, 1000);
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

/* function draw() {
    // let flag = false;
    var vol = mic.getLevel();
    // console.log(vol)
    if(vol > 0.2){
        console.log("true"); //created to check whether sound detection is working
        watch.stop();
        // flag = true;
    }
    // return flag;
} */

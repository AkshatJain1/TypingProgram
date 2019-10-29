const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var tens    = 0;
var seconds = 0;
var min     = 0;

end = false;

// Match the text entered with the provided text on the page:
function check(){
  let text = testArea.value;
  if(text == originText){
    clearInterval(Interval);

    testArea.removeEventListener('keypress',function(){clearInterval(Interval); Interval = setInterval(time,10);},false);
    end = true;

    var minTook = min + seconds/60 + tens/100;
    var words = originText.length/5.1
    alert('Your typing speed is ' + Number((words/minTook).toFixed(3)) + 'words per minute!')

    testWrapper.style.borderColor = 'green'
  }
  else if(!end && text == originText.substring(0,text.length)){
    testWrapper.style.borderColor = 'blue'
  }
  else if (!end){
    testWrapper.style.borderColor = 'red'
  }

}

// Run the timer:
function time(e){

  if(!end) {
    tens++;
  }
   if(tens < 9){
        let str = theTimer.innerHTML.substring(0,6);
       str+='0'+tens;
       theTimer.innerHTML = str;

   }

    if (tens > 9){
     let str = theTimer.innerHTML.substring(0,6);
    str += tens;
    theTimer.innerHTML = str;

   }

    if (tens > 99 && seconds<9) {

     seconds++;
     tens = 0;
     let str = theTimer.innerHTML.substring(0,3);
     str += '0' + seconds + ':' + '0' + '0';
     theTimer.innerHTML = str;
    }

    if (tens>99 && seconds >= 9){

     seconds++;
     tens = 0;
     let str = theTimer.innerHTML.substring(0,3);
     str += seconds + ':' + '0' + '0';
     theTimer.innerHTML = str
    }

    if(seconds>59 && min < 9){

      min++;
      seconds = 0;

      str = '0' + min + ':' + '0' + '0' + ':' + '0' + '0';
      theTimer.innerHTML = str
    }

    if(seconds>59 && min >= 9){

      min++;
      seconds = 0;

      str =  min + ':' + '0' + '0' + ':' + '0' + '0';
      theTimer.innerHTML = str
    }
    check();
}

// Reset everything:
function reset(e) {
  e.preventDefault();

  clearInterval(Interval);
  theTimer.innerHTML = '00:00:00';
  tens    = 0;
  seconds = 0;
  min     = 0;

  end = false;

  testArea.value = '';
  testWrapper.style.borderColor = 'grey'

}

// Event listeners for keyboard input and the reset button:
var Interval;
testArea.addEventListener('keypress',function(){clearInterval(Interval); Interval = setInterval(time,10);},false)
resetButton.addEventListener('click',reset,false)

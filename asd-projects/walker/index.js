/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  var KEY2 = {
    RIGHT: 68,
    LEFT: 65,
    UP: 87,
    DOWN: 83,
  };

  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  };

  var walker2 = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  };

  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);   
  
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    newColor();
    wallCollision();
    redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT){
      walker.speedX = 5;
    } else if (event.which === KEY.UP){
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN){
      walker.speedY = 5;
    }

    if (event.which === KEY2.LEFT){
      walker2.speedX = -5;
    } else if (event.which === KEY2.RIGHT){
      walker2.speedX = 5;
    } else if (event.which === KEY2.UP){
      walker2.speedY = -5;
    } else if (event.which === KEY2.DOWN){
      walker2.speedY = 5;
    }
  }

    function handleKeyUp(event){
      if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
        walker.speedX = 0;
      }else if (event.which === KEY.UP || event.which === KEY.DOWN){
        walker.speedY = 0;
      }

      if (event.which === KEY2.LEFT || event.which === KEY2.RIGHT){
        walker2.speedX = 0;
      }else if (event.which === KEY2.UP || event.which === KEY2.DOWN){
        walker2.speedY = 0;
      }
    }

    

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker.positionX += walker.speedX; 
    walker.positionY += walker.speedY;

    walker2.positionX += walker2.speedX; 
    walker2.positionY += walker2.speedY;
  }

  function wallCollision() {
    if (walker.positionX >= $("#board").width()-51) {
      walker.positionX = $("#board").width()-51
      walker.speedX = 0
    } else if (walker.positionX <= 0) {
      walker.positionX = 0
      walker.speedX = 0
    }

    if (walker.positionY >= $("#board").height()-51) {
      walker.positionY = $("#board").height()-51;
      walker.speedY = 0;
    } else if (walker.positionY <= 0) {
      walker.positionY = 0;
      walker.speedY = 0;
    }

    if (walker2.positionX >= $("#board").width()-51) {
      walker2.positionX = $("#board").width()-51
      walker2.speedX = 0
    } else if (walker2.positionX <= 0) {
      walker2.positionX = 0
      walker2.speedX = 0
    }

    if (walker2.positionY >= $("#board").height()-51) {
      walker2.positionY = $("#board").height()-51;
      walker2.speedY = 0;
    } else if (walker2.positionY <= 0) {
      walker2.positionY = 0;
      walker2.speedY = 0;
    }
  }

  function newColor(){
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $("#walker").css("background-color", randomColor); 
    $("#walker2").css("background-color", randomColor); 
  }


  function redrawGameItem(){
    $("#walker").css("left", walker.positionX); 
    $("#walker").css("top", walker.positionY); 
    $("#walker2").css("left", walker2.positionX); 
    $("#walker2").css("top", walker2.positionY); 
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

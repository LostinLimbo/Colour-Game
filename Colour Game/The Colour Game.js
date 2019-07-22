var game = {}

game.init = function(){
  difficulty();
  resetButton();
  setupSquares();
  resetMode();
}

var numSquares = 6;
var colours = [];+6-96
var pickedColour;
var squares = document.querySelectorAll(".square");
var rgb = document.querySelector("#rgb");
var title = document.querySelector("#title");
var resetBtn = document.querySelector(".reset", ".reset-btn-hover");
var message = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");

game.init();




// Functions

// Initialization
function init(){
  // Mode Buttons
  // Reset Button
  // Code for win/lose text and square instructions
}

// Square Setup and text content
function setupSquares(){
  for(var i = 0; i < squares.length; i++){
    // add click listeners to squares
    squares[i].addEventListener("click", function(){
     // grab colour of clicked square
     var clickedColour = this.style.background;
     // compare colour to pickedColour
     if(clickedColour === pickedColour){
      title.style.backgroundColor = clickedColour;
      // add victory message
      message.innerHTML = "Victory!  <i class='far fa-laugh-beam'></i>";
      resetBtn.textContent = "Play Again?";
      // change all squares to clicked colour
      changeColours(clickedColour);
      }  else {
       // make failed square disappear
       this.classList.toggle("hidden");
       // add failed message
       message.innerHTML = "You Failed!   <i class='far fa-angry'></i>";
     }
    });
   };
}

// Difficulty change - easy and hard combined
function difficulty(){
  for(i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      // The next if statement can be written an easier shorter WebAssembly, good when there is only one "if" condition. All on one line
       
      // if(this.textContent === "Easy"){
      this.textContent === "Easy"
      // then
      ? 
       //   numSquares = 3;
      numSquares = 3: 
      // } else{
      //   numSquares = 6;
      // }
      numSquares = 6;
      resetMode();
    })
  }
}


// Reset Button
function resetButton(){
  resetBtn.addEventListener("mouseover", function(){
    resetBtn.classList.replace("reset", "reset-btn-hover");
  });
  resetBtn.addEventListener("mouseout", function(){
    resetBtn.classList.replace("reset-btn-hover", "reset");
  });
  resetBtn.addEventListener("click", function(){
  resetMode(); 
    })
  } 
  
  function resetMode(){
    colours = generateRandomColours(numSquares);
    pickedColour = pickColour();
    rgb.textContent = pickedColour;
    // title.style.backgroundColor = "#5454d1";
    message.textContent = "";
    resetBtn.textContent = "New Colours?";
    for(i = 0; i < squares.length; i++){
      if(colours[i]){
        squares[i].classList.remove("hidden");
        squares[i].style.background = colours[i];
      } else {
        squares[i].classList.add("hidden")
      } 
      }
  }



// victory change square colour
function changeColours(colour){
 for(i = 0; i < squares.length; i++){
   if(colours[i]){
     squares[i].classList.remove("hidden");
     squares[i].style.background = colour;
   } else{
     squares[i].classList.add("hidden")
   }
  
 }
}


// Picking random colours on start
function pickColour(){
 var random = Math.floor(Math.random() * colours.length);
 return colours[random];
}

// Generate six random colours in array
function generateRandomColours(num){
 // make an array
 var arr = []
 // add num random colours to array
 for(var i = 0; i < num; i++){
 // get random colour and push into array
  arr.push(randomColour());
 }
 // return that array
return arr;
}

// Choose random colours
function randomColour(){
 // pick a red from 255
 var red = Math.floor(Math.random() * 256);
 // pick a green from 255
 var green = Math.floor(Math.random() * 256); 
 // pick a blue from 255
 var blue = Math.floor(Math.random() * 256);
 return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Code I've Tidied up a bit

// Easy Button Reset
// function easyReset(){
//   easyBtn.addEventListener("click", function(){
//     for(i = 3; i < squares.length; i++){
//       squares[i].classList.add("hidden");
//     } 
//     numSquares = 3;
//     colours = generateRandomColours(numSquares);  
//     for(i = 0; i < squares.length; i++){
//       if(colours[i]){
//         squares[i].style.background = colours[i];
//         squares[i].classList.remove("hidden");
//       } else{
//         squares[i].classList.add("hidden")
//       } 
//     }
//     pickedColour = pickColour();
//     rgb.textContent = pickedColour;
//     title.style.backgroundColor = "#5454d1";
//     message.textContent = "";
//     resetBtn.textContent = "New Colours?";
//   })
// }

// // Hard Button Reset
// function hardReset(){
//   hardBtn.addEventListener("click", function(){
//     numSquares = 6;
//     colours = generateRandomColours(numSquares);
//     pickedColour = pickColour();
//     rgb.textContent = pickedColour;
//     title.style.backgroundColor = "#5454d1";
//     message.textContent = "";
//     resetBtn.textContent = "New Colours?";
//     for(i = 0; i < squares.length; i++){
//       squares[i].classList.remove("hidden");
//       squares[i].style.background = colours[i];
//     }   
//   });
// }

 
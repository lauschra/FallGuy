// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

//I moved the keydown handler to the Engine

//function to start the gameloop and reset enemies
const gameStartHandler = () => {

  //function call to reset settings
  gameEngine.restartGame()

  // We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
  document.addEventListener('keydown', gameEngine.keydownHandler);
  gameEngine.gameLoop()

  // console.log("start game");
}


// We call the gameLoop method to start the game when any key is pressed
document.addEventListener('keydown', gameStartHandler);


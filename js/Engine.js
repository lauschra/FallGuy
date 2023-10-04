// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
    //add score count and best score
    this.score = 0
    this.bestScore = 0

    this.laneNumber = 3
  }


  //handler for controls
  keydownHandler = (event) => {
    // event.code contains a string. The string represents which key was press. If the
    // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
    if (event.code === 'ArrowLeft') {
      //make player image switch side
      this.player.domElement.style.transform = "scale(-1, 1)"
      //if nothing blocking, move
      if(isLeftClear(this.player, this.enemies)){
        this.player.moveLeft()
      };
    }
    
    // If `event.code` is the string that represents a right arrow keypress,
    // then move our hamburger to the right
    if (event.code === 'ArrowRight') {
      //make player image switch side
      this.player.domElement.style.transform = "scale(1, 1)"
      //if nothing blocking, move
      if(isRightClear(this.player, this.enemies)){
        this.player.moveRight()
      };
    }
  };


  //method to reset game
  restartGame = () => {

    this.lastFrame = new Date().getTime()

    //reset falling speed to default
    this.player.gravity = 0.25

    //Make the ememies reset
    this.enemies.forEach((enemy) => {
      enemy.domElement.remove()
    })
    this.enemies = []
  
    //Make score reset
    this.score = 0
  
    //reset player position
    this.player.y = PLAYER_HEIGHT
    this.player.domElement.style.top = `${this.player.y}px`;
    
    this.player.x = 2 * PLAYER_WIDTH;
    this.player.domElement.style.left = `${this.player.x}px`;
    //remove message
    message.style.display = "none"
    
    //remove game start event while game is running
    document.removeEventListener('keydown', gameStartHandler);
  }


  //check is player is dead
  isPlayerDead = () => {
    
    if (this.player.y > GAME_HEIGHT  || this.player.y + PLAYER_HEIGHT < 0){
      return true
    }
    return false

  };



  

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {

    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });








    // make player fall when no collision is detected
    if (detectPlatform(this.player, this.enemies)){

      //reset fall speed if collision made
      this.player.gravity = 0.25

      //switch player image to standing
      this.player.domElement.src = 'images/char-standing.webp'

      //player height becomes block height where y-axis collision occurs
      this.player.y = this.enemies[activeBlockIndex].y - PLAYER_HEIGHT
      this.player.domElement.style.top = `${this.player.y}px`;
    }

    else{
      //player falls
      this.player.update(timeDiff)
      //change player image to falling
      this.player.domElement.src = 'images/char-falling.webp'
    }





    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    
    
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {

      //stop burger from moving
      document.removeEventListener('keydown', this.keydownHandler)
      
      //add delay so the game doesn't instantly restart if an arrow key was press right after GAME OVER
      setTimeout(() => {
        //Put back event listener for game start the game able to restart
        document.addEventListener('keydown', gameStartHandler);
      }, 150);

      //update best score
      if (this.bestScore < this.score){
        this.bestScore = this.score
        bestBox.innerText = "Best: "+this.bestScore
      }

      //make message reappear
      message.style.display = "flex"
      //change text for game over messages
      const gameOverText = document.createElement("p")
      gameOverText.style.fontSize = "52px"
      gameOverText.innerText = "GAME OVER!"
      message.innerText = "Press any key to restart!"
      message.prepend (gameOverText)
      return;
    }
  
  
  //increment score and uptade it on the UI
  this.score++
  scoreBox.innerText = "Score: "+this.score


  // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
  setTimeout(this.gameLoop, 20);
  };


}
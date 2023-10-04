// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.


// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 75;
const MAX_ENEMIES = 7;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 8*ENEMY_WIDTH;
const GAME_HEIGHT = 10*ENEMY_HEIGHT;
app.style.maxWidth = GAME_WIDTH
app.style.maxHeight = GAME_HEIGHT


// const MESSAGE_POSITION = {x: GAME_WIDTH/2, y: GAME_HEIGHT/2};
// message.style.top = MESSAGE_POSITION.y + "px"
// message.style.left = MESSAGE_POSITION.x + "px"
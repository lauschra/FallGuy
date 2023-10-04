let activeBlockIndex = undefined

detectPlatform = (player, enemies) => {

// detects collision on y axis in the same lane and returns true
for (let index = 0; index<enemies.length; index++){
   const enemy = enemies[index]
   
   // check for y axis collision
   if (enemy.x === player.x
   //is enemy bottom touching player top
   && enemy.y + (ENEMY_HEIGHT) -20 >= player.y
   //is enemy top touching player bottom
   && enemy.y <= player.y + PLAYER_HEIGHT){
      
      //flags which block in the array the collision occurs
      activeBlockIndex = index
      
      return true
      }     
   }
   return false
}

isLeftClear = (player, enemies) => {
   
   for (let index = 0; index<enemies.length; index++){
      const enemy = enemies[index]

      //check if there's a block on the left
      if (player.x === enemy.x + ENEMY_WIDTH
      //is enemy bottom touching player top
      && enemy.y + (ENEMY_HEIGHT) -20 >= player.y
      //is enemy top touching player bottom
      && enemy.y <= player.y + PLAYER_HEIGHT){
         return false
      }  
   }
   return true
}

isRightClear = (player, enemies) => {

   for (let index = 0; index<enemies.length; index++){
      const enemy = enemies[index]

      //check if there's a block on the right
      if ( player.x + PLAYER_WIDTH === enemy.x
      //is enemy bottom touching player top
      && enemy.y + (ENEMY_HEIGHT) -20 >= player.y
      //is enemy top touching player bottom
      && enemy.y <= player.y + PLAYER_HEIGHT){
         return false
      }
   }
   return true
}
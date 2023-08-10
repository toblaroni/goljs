
const ALIVE = 0
const DEAD = 1
let width, height

let pState = [[]]
let cState = [[]]

// Create a new game with command line arguments
function createGame(w, h) {
   if (w < 5 || h < 5) {
      w = 5
      h = 5
   }

   width = w
   height = h

   // Create empty arrays
   let cState = [...Array(h)].map((e) => Array(w))
   let pState = [...Array(h)].map((e) => Array(w))

   // Populate the grid with random symbols
   for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
         cState[i][j] = Math.floor(Math.random() * 2)
      }
   }

   return [pState, cState]
}

function checkAbove(i, j) {
   if (cState[i-1][j] == ALIVE)
      return 1
   return 0
}

function checkBelow(i, j) {
   if (cState[i+1][j] == ALIVE)
      return 1
   return 0
}

function checkLeft(i, j) {
   if (cState[i][j-1] == ALIVE)
      return 1
   return 0
}

function checkRight(i, j) {
   if (cState[i][j+1] == ALIVE)
      return 1
   return 0
}

function checkTL(i, j) {
   if (cState[i-1][j-1] == ALIVE)
      return 1
   return 0
}

function checkTR(i, j) {
   if (cState[i-1][j+1] == ALIVE)
      return 1
   return 0
}

function checkBL(i, j) {
   if (cState[i+1][j-1] == ALIVE)
      return 1
   return 0
}

function checkBR(i, j) {
   if (cState[i+1][j+1] == ALIVE)
      return 1
   return 0
}

// Gets passed the previous state and current state
function updateGame(pState, cState) {
   // Set the pState to the cState
   pState = cState

   // Loop through cells and update them according to their neighbors   
   for (let i = 0; i < cState.length; i++) {
      for (let j = 0; j < cState[0].length; j++) {
         let neighbors = checkNeighbours(i, j)

         if (neighbors === 3 && cState[i][j] === DEAD)
            cState[i][j] = ALIVE
         else if ((neighbors === 2 || neighbors === 3) && cState[i][j] === ALIVE)
            continue
         else 
            cState[i][j] = DEAD

      }
   }
   console.log(cState)
}

function checkNeighbours(i, j) {
   let neighbors = 0
   // Corners
   if (i === 0 && j === 0) { // Top left
      neighbors += checkRight(i, j)
      neighbors += checkBelow(i, j)
      neighbors += checkBR(i, j)
      return neighbors
   } else if (i === 0 && j === width - 1 ) { // Top right
      neighbors += checkLeft(i, j)
      neighbors += checkBelow(i, j)
      neighbors += checkBL(i, j)
      return neighbors
   } else if (i === height - 1 && j === 0) { // Bottom left
      neighbors += checkRight(i, j)
      neighbors += checkAbove(i, j)
      neighbors += checkTR(i, j)
      return neighbors
   } else if (i === height - 1 && j === width - 1) { // Bottom Right
      neighbors += checkLeft(i, j)
      neighbors += checkAbove(i, j)
      neighbors += checkTL(i, j)
      return neighbors
   }

   // Edges 
   if (i === 0) {
      neighbors += checkBelow(i, j)
      neighbors += checkLeft(i, j)
      neighbors += checkRight(i, j)
      neighbors += checkBL(i, j)
      neighbors += checkBR(i, j)
      return neighbors
   } else if (i === height-1) {
      neighbors += checkAbove(i, j)
      neighbors += checkLeft(i, j)
      neighbors += checkRight(i, j)
      neighbors += checkTL(i, j)
      neighbors += checkTR(i, j)

      return neighbors
   } else if (j === 0) {
      neighbors += checkAbove(i, j)
      neighbors += checkBelow(i, j)
      neighbors += checkRight(i, j)
      neighbors += checkBR(i, j)
      neighbors += checkTR(i, j)

      return neighbors
   } else if (j === width-1) {
      neighbors += checkBelow(i, j)
      neighbors += checkAbove(i, j)
      neighbors += checkLeft(i, j)
      neighbors += checkBL(i, j)
      neighbors += checkTL(i, j)
      return neighbors
   }

   // Check the rest
   neighbors += checkAbove(i, j)
   neighbors += checkBelow(i, j)

   neighbors += checkLeft(i, j)
   neighbors += checkRight(i, j)

   neighbors += checkTL(i, j)
   neighbors += checkTR(i, j)

   neighbors += checkBL(i, j)
   neighbors += checkBR(i, j)

   return neighbors
}

export {createGame, updateGame}
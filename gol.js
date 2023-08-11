
const ALIVE = 0
const DEAD = 1
let width, height

// Create a new game with command line arguments
export function createGame(w, h) {

   width = w
   height = h

   // Create empty arrays
   let cState = [...Array(h)].map((e) => Array(w))
   let pState = [...Array(h)].map((e) => Array(w))

   // Populate the grid with random symbols
   for (let i = 0; i < h; i++) 
      for (let j = 0; j < w; j++) 
         cState[i][j] = Math.floor(Math.random() * 2)

   return [pState, cState]
}

// Gets passed the current state
export function updateGame(cState) {
   // Set the pState to the cState
   let pState = deepCopy2DArray(cState);

   // Loop through cells and update them according to their neighbors   
   for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
         let neighbors = checkNeighbours(i, j, pState)

         if (pState[i][j] === DEAD) {
            if (neighbors === 3)
               cState[i][j] = ALIVE;
         } else { // Alive
            if (neighbors == 2 || neighbors == 3) {
               cState[i][j] = ALIVE;
            } else {
               cState[i][j] = DEAD;
            }
         }
      }
   }
   // console.log(cState)
   return cState;
}

export function checkNeighbours(i, j, pState) {
   let neighbors = 0
   // Corners
   if (i === 0 && j === 0) { // Top left
      neighbors += checkRight(i, j, pState)
      neighbors += checkBelow(i, j, pState)
      neighbors += checkBR(i, j, pState)
      return neighbors
   } else if (i === 0 && j === width - 1 ) { // Top right
      neighbors += checkLeft(i, j, pState)
      neighbors += checkBelow(i, j, pState)
      neighbors += checkBL(i, j, pState)
      return neighbors
   } else if (i === height - 1 && j === 0) { // Bottom left
      neighbors += checkRight(i, j, pState)
      neighbors += checkAbove(i, j, pState)
      neighbors += checkTR(i, j, pState)
      return neighbors
   } else if (i === height - 1 && j === width - 1) { // Bottom Right
      neighbors += checkLeft(i, j, pState)
      neighbors += checkAbove(i, j, pState)
      neighbors += checkTL(i, j, pState)
      return neighbors
   }

   // Edges 
   if (i === 0) {
      neighbors += checkBelow(i, j, pState)
      neighbors += checkLeft(i, j, pState)
      neighbors += checkRight(i, j, pState)
      neighbors += checkBL(i, j, pState)
      neighbors += checkBR(i, j, pState)
      return neighbors
   } else if (i === height-1) {
      neighbors += checkAbove(i, j, pState)
      neighbors += checkLeft(i, j, pState)
      neighbors += checkRight(i, j, pState)
      neighbors += checkTL(i, j, pState)
      neighbors += checkTR(i, j, pState)

      return neighbors
   } else if (j === 0) {
      neighbors += checkAbove(i, j, pState)
      neighbors += checkBelow(i, j, pState)
      neighbors += checkRight(i, j, pState)
      neighbors += checkBR(i, j, pState)
      neighbors += checkTR(i, j, pState)

      return neighbors
   } else if (j === width-1) {
      neighbors += checkBelow(i, j, pState)
      neighbors += checkAbove(i, j, pState)
      neighbors += checkLeft(i, j, pState)
      neighbors += checkBL(i, j, pState)
      neighbors += checkTL(i, j, pState)
      return neighbors
   }

   // Check the rest
   neighbors += checkAbove(i, j, pState)
   neighbors += checkBelow(i, j, pState)

   neighbors += checkLeft(i, j, pState)
   neighbors += checkRight(i, j, pState)

   neighbors += checkTL(i, j, pState)
   neighbors += checkTR(i, j, pState)

   neighbors += checkBL(i, j, pState)
   neighbors += checkBR(i, j, pState)

   return neighbors
}


function checkAbove(i, j, pState) {
   if (pState[i-1][j] === ALIVE)
      return 1
   return 0
}

function checkBelow(i, j, pState) {
   if (pState[i+1][j] === ALIVE)
      return 1
   return 0
}

function checkLeft(i, j, pState) {
   if (pState[i][j-1] === ALIVE)
      return 1
   return 0
}

function checkRight(i, j, pState) {
   if (pState[i][j+1] === ALIVE)
      return 1
   return 0
}

function checkTL(i, j, pState) {
   if (pState[i-1][j-1] === ALIVE)
      return 1
   return 0
}

function checkTR(i, j, pState) {
   if (pState[i-1][j+1] === ALIVE)
      return 1
   return 0
}

function checkBL(i, j, pState) {
   if (pState[i+1][j-1] === ALIVE)
      return 1
   return 0
}

function checkBR(i, j, pState) {
   if (pState[i+1][j+1] === ALIVE)
      return 1
   return 0
}

function deepCopy2DArray(arr) {
   let copiedArr = [];

   for (let i = 0; i < arr.length; i++) {
      let copiedRow = [];
      for (let j = 0; j < arr[i].length; j++) {
         copiedRow.push(arr[i][j]);
      }
      copiedArr.push(copiedRow);
   }

   return copiedArr;
}
 
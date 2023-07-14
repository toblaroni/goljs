console.log(process.argv[2])

const ALIVE = 0
const DEAD = 1

let pState = [[]]
let cState = [[]]

// Create a new game with command line arguments
function createGame(w, h) {
   if (w < 5 || h < 5) {
      w = 5
      h = 5
   }

   // Create empty arrays
   cState = [...Array(h)].map((e) => Array(w))
   pState = [...Array(h)].map((e) => Array(w))

   // Populate the grid with random symbols
   for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
         let r = Math.random()
         if (r > 0.5) cState[i][j] = ALIVE
         else cState[i][j] = DEAD
      }
   }

   console.log(cState)
}

function updateGame() {
   // Set the pState to the cState
   pState = cState
}

createGame(5, 5)
updateGame()


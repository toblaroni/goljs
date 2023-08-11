import { checkNeighbours, createGame, updateGame } from "./gol.js";

const mainContainer = document.getElementById('main-container');
const togglePlayBtn = document.getElementById('stop-start')
const clearBtn      = document.getElementById('clear')
const randomBtn     = document.getElementById('random')

const ALIVE = 0;
const DEAD = 1;
let cols, rows;
let cState;
let isRunning = false;
let golInterval;

function handleClick(event) {
    if (event.target === mainContainer) return

    let i = event.target.getAttribute('i');
    let j = event.target.getAttribute('j');

    if (event.target.checked) {
        cState[i][j] = ALIVE;
        return;
    }

    cState[i][j] = DEAD;
}

function togglePlay(event) {
    if (isRunning) {
        clearInterval(golInterval);
        isRunning = false;
        return;
    }  
    golInterval = setInterval(updateCheckboxGrid, 100);
    isRunning = true;
}

function clear() {
    // Clear the game
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cState[i][j] = DEAD
            document.querySelector(`input[type="checkbox"][i="${i}"][j="${j}"]`).checked = false
        }
    }
    

}

function random() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cState[i][j] = Math.floor(Math.random() * 2)
            let cBox = document.querySelector(`input[type="checkbox"][i="${i}"][j="${j}"]`)
            cBox.checked = cState[i][j] == ALIVE;
        }
    }
}

function createCheckboxGrid() {
    // Creates a big 2D array of checkboxes
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create a game based on the size of the screen and the size of a checkbox
    let testBox = document.createElement('input')
    testBox.type = 'checkbox'
    mainContainer.appendChild(testBox)

    let _cols = Math.floor(window.innerWidth / testBox.clientWidth);
    let _rows = Math.floor(window.innerHeight / testBox.clientHeight);

    cols = _cols > 40 ? 40 : _cols;
    rows = cols === 40 ? 40 : _rows;

    mainContainer.removeChild(testBox)

    cState = createGame(cols, rows)

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.setAttribute('i', i)
            checkbox.setAttribute('j', j)
            if (cState[i][j] === ALIVE) checkbox.checked = true;
            mainContainer.appendChild(checkbox)

        }
        mainContainer.appendChild(document.createElement('br'))
    } 

}

function updateCheckboxGrid() {
    // Update the checkbox grid
    cState = updateGame(cState);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cBox = document.querySelector(`input[type="checkbox"][i="${i}"][j="${j}"]`)
            if (cState[i][j] === ALIVE) cBox.checked = true;
            else cBox.checked = false;
        }
    }
}

createCheckboxGrid();

mainContainer.addEventListener("click", handleClick)
togglePlayBtn.addEventListener("click", togglePlay)
clearBtn.addEventListener("click", clear)
randomBtn.addEventListener("click", random)
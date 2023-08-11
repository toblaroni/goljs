import { checkNeighbours, createGame, updateGame } from "./gol.js";

const mainContainer = document.getElementById('main-container');
const togglePlayBtn = document.getElementById('stop-start')

const ALIVE = 0;
const DEAD = 1;
const cols = 4;
const rows = cols;
let pState, cState;
let isRunning = false;
let golInterval;

function handleClick(event) {
    if (event.target === mainContainer) return

    let i = event.target.getAttribute('i');
    let j = event.target.getAttribute('j');

    console.log(checkNeighbours(+i, +j, cState))

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
    golInterval = setInterval(updateCheckboxGrid, 250);
    isRunning = true;
}

function createCheckboxGrid() {
    // Creates a big 2D array of checkboxes
    const width = window.innerWidth;
    const height = window.innerHeight;

    [pState, cState] = createGame(cols, rows)

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
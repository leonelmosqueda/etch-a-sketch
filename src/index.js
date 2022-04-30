const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color-mode';

const $gridContainer = document.querySelector('#grid-container');

const $inputSizeRange = document.querySelector('input[type="range"]');

window.addEventListener('load', () => {
    createGrid(DEFAULT_SIZE);
    highlightButton(DEFAULT_MODE);
    showGridSize(DEFAULT_SIZE);
})

function createGrid (size) {
    $gridContainer.setAttribute('style', `display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
    `);

    for (let i = 1; i <= size*size; i++) {
        const newGrid = document.createElement('div');
        newGrid.classList.add('grid-item');

        $gridContainer.appendChild(newGrid);
    }
}

function highlightButton(mode) {
    document.querySelector(`.${mode}`).classList.add(`${mode}-active`);
}

function showGridSize (size) {
    const gridSize = document.querySelector('#grid-size-value');

    gridSize.textContent = `${size} x ${size}`;
}

$inputSizeRange.addEventListener('input', () => {
    const newGridSize = document.querySelector('input[type="range"]').value;

    showGridSize(Number(newGridSize));
});
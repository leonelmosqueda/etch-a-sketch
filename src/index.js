const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color-mode';
let newColor = DEFAULT_COLOR;

const $gridContainer = document.querySelector('#grid-container');

const $inputSizeRange = document.querySelector('input[type="range"]');
const $inputColor = document.querySelector('input[type="color"]');

const $btnApplySize = document.querySelector('#btn-apply-size');
const $btnClearGrid = document.querySelector('#btn-clear-grid');
const $btnColorMode = document.querySelector('#btn-color-mode');
const $btnRainbowMode = document.querySelector('#btn-rainbow-mode');
const $btnEraserMode = document.querySelector('#btn-eraser-mode');

window.addEventListener('load', () => {
    createGrid(DEFAULT_SIZE);
    highlightButton(DEFAULT_MODE);
    showGridSize(DEFAULT_SIZE);
    changeHoverColor(DEFAULT_COLOR);
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

$btnApplySize.addEventListener('click', () => {
    const newGridSize = document.querySelector('input[type="range"]').value;
    
    clearGrid();
    createGrid(Number(newGridSize));
});

$btnClearGrid.addEventListener('click', () => {
    const gridSize = document.querySelector('input[type="range"]').value;
    
    clearGrid();
    createGrid(Number(gridSize));
});

function clearGrid () {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item) => {
        item.remove();
    });    
}

$inputColor.addEventListener('input', () => {
    newColor = document.querySelector('input[type="color"]').value;

    restoreButtonsState('rainbow-mode', 'eraser-mode');
    highlightButton('color-mode');
    changeHoverColor(newColor);
});

function changeHoverColor (color) {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item) => {
        item.classList.add('hover');
        item.setAttribute('style', `--item-background-color: ${color};`);
    });
}

$btnColorMode.addEventListener('click', () => {
    if (validateClick('color-mode')) {
        restoreButtonsState('rainbow-mode', 'eraser-mode');
        highlightButton('color-mode');
        changeHoverColor(newColor);
    } else {
        return;
    }
});

function validateClick (mode) {
    const element = document.querySelector(`.${mode}`);

    if (element.classList.contains(`${mode}-active`)) {
        return false;
    } else {
        return true;
    }
}

function restoreButtonsState (btn1, btn2) {
    document.querySelector(`.${btn1}`).classList.remove(`${btn1}-active`);
    document.querySelector(`.${btn2}`).classList.remove(`${btn2}-active`);
}

$btnRainbowMode.addEventListener('click', () => {
    if (validateClick('rainbow-mode')) {
        restoreButtonsState('color-mode', 'eraser-mode');
        highlightButton('rainbow-mode');
        changeHoverColor('#333');
    } else {
        return;
    }
});

$btnEraserMode.addEventListener('click', () => {
    if (validateClick('eraser-mode')) {
        restoreButtonsState('color-mode', 'rainbow-mode');
        highlightButton('eraser-mode');
        changeHoverColor('white');
    } else {
        return;
    }
});
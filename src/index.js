const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color-mode';
let newColor = DEFAULT_COLOR;
let toPaint = false;
let currentColor;
let actualMode;

const $gridContainer = document.querySelector('#grid-container');
const $grid = document.querySelectorAll('.grid-item');

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
    actualMode = 'color-mode';
})

function createGrid (size) {
    $gridContainer.setAttribute('style', `display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
    `);

    for (let i = 1; i <= size*size; i++) {
        const newGrid = document.createElement('div');
        newGrid.classList.add('grid-item');
        newGrid.id = i;

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
    const newGridSize = $inputSizeRange.value;

    showGridSize(Number(newGridSize));
});

$btnApplySize.addEventListener('click', () => {
    const newGridSize = $inputSizeRange.value;
    
    clearGrid();
    createGrid(Number(newGridSize));
    restoreButtonsState('rainbow-mode', 'eraser-mode');
    actualMode = 'color-mode';
    highlightButton(actualMode);
    newColor = $inputColor.value;
});

$btnClearGrid.addEventListener('click', () => {
    const gridSize = $inputSizeRange.value;
    newColor = $inputColor.value;
    
    clearGrid();
    createGrid(Number(gridSize));
    restoreButtonsState('rainbow-mode', 'eraser-mode');
    actualMode = 'color-mode';
    highlightButton(actualMode);
});

function clearGrid () {
    const gridItems = $gridContainer.querySelectorAll('grid-item');

    gridItems.forEach((item) => {
        item.remove();
    });    
}

$inputColor.addEventListener('input', () => {
    newColor = $inputColor.value;

    restoreButtonsState('rainbow-mode', 'eraser-mode');
    highlightButton(actualMode);
});

$btnColorMode.addEventListener('click', () => {
    if (validateClick('color-mode')) {
        restoreButtonsState('rainbow-mode', 'eraser-mode');
        actualMode = 'color-mode';
        highlightButton(actualMode);
        newColor = $inputColor.value;
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
        actualMode = 'rainbow-mode';
        highlightButton(actualMode);
        newColor = 'linear-gradient(91deg, rgba(0, 255, 0, 0.4) 0%, rgba(255, 0, 0, 0.38) 50%, rgba(0, 0, 255, 0.43) 100%)';
    } else {
        return;
    }
});

$btnEraserMode.addEventListener('click', () => {
    if (validateClick('eraser-mode')) {
        restoreButtonsState('color-mode', 'rainbow-mode');
        actualMode = 'eraser-mode';
        highlightButton(actualMode);
        newColor = 'white';
    } else {
        return;
    }
});

$gridContainer.addEventListener('mouseover', e => {
    applyHover(e.target, newColor, actualMode);
});

$gridContainer.addEventListener('mouseout', e => {
    removeHover(e.target);
});

function applyHover (item, color, mode) {
    currentColor = '';
    saveCurrentBackgroundColor(item);
    changeHoverColor(item, color);
    applyBoxShadow(item, color, mode);
}

function removeHover (item) {
    changeHoverColor(item, currentColor);
    removeBoxShadow(item);
}

function saveCurrentBackgroundColor (item) {
    currentColor = item.style.background;
}

function changeHoverColor(item, color) {
    item.style.background = color;
}

function applyBoxShadow (item, color, mode) {
    if (mode === 'rainbow-mode') {
        item.style.boxShadow = `0 0  20px 5px green`;
    }
    item.style.boxShadow = `0 0  20px 5px ${color}`;
}

function removeBoxShadow (item) {
    item.style.boxShadow = null;
}
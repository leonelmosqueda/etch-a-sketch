const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color-mode';

const $gridContainer = document.querySelector('#grid-container');

const $inputSizeRange = document.querySelector('input[type="range"]');
const $inputColor = document.querySelector('input[type="color"]');

const $btnApplySize = document.querySelector('#btn-apply-size');
const $btnColorMode = document.querySelector('#btn-color-mode');

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

$btnApplySize.addEventListener('click', () => {
    const newGridSize = document.querySelector('input[type="range"]').value;

    createGrid(Number(newGridSize));
});

$inputColor.addEventListener('input', () => {
    const newColor = document.querySelector('input[type="color"]').value;

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
    if (!validateClick($btnColorMode.id)) {
        return;
    }
});

function validateClick (idElement) {
    const element = document.querySelector(`#${idElement}`)

    if (element.classList.contains(`${idElement}-active`)) {
        return true;
    } else {
        return false;
    }
}
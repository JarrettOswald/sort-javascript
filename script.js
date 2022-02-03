'use strict';

const box = document.querySelector('.box');

const list = getRandomList();

const stop = document.querySelector('.stop');

stop.addEventListener('click', () => {
    this.list = getRandomList();
    render(this.list);
    addListener();
});

render(list);

addListener();

function addListener() {
    let btns = document.querySelectorAll('.btn');
    btns[0].addEventListener('click', () => listnerClick(bubbleSort));
    btns[0].addEventListener('mouseenter', () => listnerHover('Bubble Sort'));

    btns[1].addEventListener('click', () => listnerClick(selectSort));
    btns[1].addEventListener('mouseenter', () => listnerHover('Select Sort'));

    btns[2].addEventListener('click', () => listnerClick(isnsertionSort));
    btns[2].addEventListener('mouseenter', () => listnerHover('Insertion Sort'));

    btns[3].addEventListener('click', () => listnerClick(shuttleSort));
    btns[3].addEventListener('mouseenter', () => listnerHover('Shuttle Sort'));

    btns[4].addEventListener('click', () => listnerClick(shellSort));
    btns[4].addEventListener('mouseenter', () => listnerHover('Shell Sort'));
}

function removeListener() {
    let btns = document.querySelectorAll('.btn');
    btns.forEach(item => {
        item.outerHTML = item.outerHTML;
    });
}

async function shellSort() {
    let lines = document.querySelectorAll('.line');
    for (let i = 1; i < lines.length; i++) {
        lines[i].classList.add('select');
        if (parseInt(lines[i].style.height) < parseInt(lines[i - 1].style.height)) {
            swap(lines, i, i - 1);
        }
        for (let j = i - 1;
            (j - 1) >= 0; j--) {
            lines[j].classList.add('select');
            await sleep(10);
            if (parseInt(lines[j].style.height) < parseInt(lines[j - 1].style.height)) {
                swap(lines, j, j - 1);
                lines[j].classList.remove('select');
            } else {
                lines[j].classList.remove('select');
                break;
            }
        }
        lines[i].classList.remove('select');
    }
}

async function shuttleSort() {
    let lines = document.querySelectorAll('.line');
    for (let i = 1; i < lines.length; i++) {
        lines[i].classList.add('select');
        lines[i - 1].classList.add('select');
        if (parseInt(lines[i].style.height) < parseInt(lines[i - 1].style.height)) {
            await sleep(10);
            swap(lines, i, i - 1);
        }
        lines[i - 1].classList.remove('select');
        lines[i].classList.remove('select');
        for (let j = i - 1; (j - 1) >= 0; j--) {
            lines[j].classList.add('select');
            lines[j-1].classList.add('select');
            if (parseInt(lines[j].style.height) < parseInt(lines[j - 1].style.height)) {
                await sleep(10);
                swap(lines, j, j - 1);
                lines[j].classList.remove('select');
                lines[j-1].classList.remove('select');
            } else {
                lines[j].classList.remove('select');
                lines[j-1].classList.remove('select');
                break;
            }
        }
        
    }
}

async function isnsertionSort() {
    let lines = document.querySelectorAll('.line');
    for (let left = 0; left < lines.length; left++) {
        let valueLine = lines[left].style.height;
        let i = left - 1;
        for (; i >= 0; i--) {
            lines[i].classList.add('select');
            await sleep(10);
            if (parseInt(valueLine) < parseInt(lines[i].style.height)) {
                lines[i + 1].style.height = lines[i].style.height;
                lines[i].classList.remove('select');
            } else {
                lines[i].classList.remove('select');
                break;
            }
        }
        lines[i + 1].style.height = valueLine;
    }
}


async function bubbleSort() {
    let lines = document.querySelectorAll('.line');
    for (let i = 0; i < lines.length; i++) {
        let lineI = lines[i];
        lineI.classList.add('select');
        for (let j = 0; j < lines.length; j++) {
            let lineJ = lines[j];
            if (parseInt(lineI.style.height) < parseInt(lineJ.style.height)) {
                lineJ.classList.add('select');
                await sleep(10);
                swap(lines, i, j);
                lineJ.classList.remove('select');
            }
        }
        lineI.classList.remove('select');
    }
}

async function selectSort() {
    let lines = document.querySelectorAll('.line');
    for (let i = 0; i < lines.length; i++) { 
        let lineMind = i;
        lines[lineMind].classList.add('select');
        for (let j = i; j < lines.length; j++) {
            if (parseInt(lines[j].style.height) < parseInt(lines[lineMind].style.height)) {
                lines[j].classList.add('select');
                await sleep(10);
                lines[lineMind].classList.remove('select');
                lineMind = j;
                lines[j].classList.remove('select');
            }
            lines[lineMind].classList.remove('select');
        }
        swap(lines, i, lineMind);
        
    }
}

function swap(lines, ind1, ind2) {
    let save = lines[ind1].style.height;
    lines[ind1].style.height = lines[ind2].style.height;
    lines[ind2].style.height = save;
}


function render(list) {
    document.querySelector('.box').remove();
    let box = document.createElement("div");
    box.classList.add('box');
    document.querySelector('.box-border').append(box);
    for (let i = 0; i < list.length; i++) {
        let height = list[i];
        let line = document.createElement('div');
        line.classList.add('line');
        line.style.height = height + "%";
        box.appendChild(line);
    }
}

function getRandomList() {
    const arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(getRandomArbitrary(30, 100));
    }

    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function fixCss() {
        arr[Math.round(Math.random() * 100)] = 100;
    }
    fixCss();
    return arr;
}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms));
}

function listnerHover(desc) {
    const descElement = document.querySelector('p');
    descElement.textContent = desc;
}

function listnerClick(sort) {
    sort();
    removeListener();
}
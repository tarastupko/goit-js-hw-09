
let start = document.querySelector('button[data-start]');
let stope = document.querySelector('button[data-stop]');

let intervalID = null;
let isActive = false;

start.disabled = false;
stope.disabled = true;

start.addEventListener('click', onStart);
stope.addEventListener('click', onStop);

function onStart(e) {
    if (isActive) {
        return;
    }
    switchColors();
    intervalID = setInterval((switchColors), 1000);
    isActive = true;
    start.disabled = true;
    stope.disabled = false;
}

function onStop(e) {
    clearInterval(intervalID);
    isActive = false;
    start.disabled = false;
    stope.disabled = true;
}
 
function switchColors() {
let randomColorRGB = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
    document.body.style.background = `${randomColorRGB}`
    console.log(randomColorRGB);
}
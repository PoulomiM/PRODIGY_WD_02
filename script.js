const playbutton = document.querySelector(".play");
const resetbutton = document.querySelector(".reset");
const lapsbutton = document.querySelector(".lap");
const hourbutton = document.querySelector(".hour");
const minbutton = document.querySelector(".minute");
const secbutton = document.querySelector(".sec");
const lapsList = document.querySelector(".laps");
const lapClearButton = document.querySelector(".lap-clear");
const lapEntries = [];

let timer = null;
let isPlay = false;
let lapNumber = 1;

function stopwatch() {
    let currentSec = parseInt(secbutton.textContent, 10);
    currentSec++;

    if (currentSec === 60) {
        secbutton.textContent = "0";
        minbutton.textContent = (parseInt(minbutton.textContent, 10) + 1).toString().padStart(2, '0');

        if (minbutton.textContent == "60") {
            minbutton.textContent = "0";
            hourbutton.textContent = (parseInt(hourbutton.textContent, 10) + 1).toString().padStart(2, '0');
        }
    } else {
        secbutton.textContent = currentSec.toString().padStart(2, '0');
    }
}

function watchStart() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}

function togglePlayPause() {
    if (!isPlay) {
        playbutton.textContent = "Pause";
        isPlay = true;
        watchStart();
    } else {
        playbutton.textContent = "Play";
        isPlay = false;
        clearInterval(timer);
    }
}

const laps = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timestamp.setAttribute("class", "time-stamp");

    number.textContent = `#${lapNumber}`;
    timestamp.textContent = `${hourbutton.textContent.padStart(2, '0')}:${minbutton.textContent.padStart(2, '0')}:${secbutton.textContent.padStart(2, '0')}`;
    
    lapNumber++;
    
    li.appendChild(number);
    li.appendChild(timestamp);
    lapEntries.push(li); 
    lapsList.innerHTML = "";
    lapEntries.forEach((lapEntry) => {
        lapsList.appendChild(lapEntry.cloneNode(true));
})
}

const reset = () => {
    playbutton.textContent = "Play";
    isPlay = false;
    clearInterval(timer);
    secbutton.textContent = "00";
    minbutton.textContent = "00 :";
    hourbutton.textContent = "00 :";
    lapNumber = 1;
    
}

playbutton.addEventListener("click", togglePlayPause);
lapsbutton.addEventListener("click", laps);
resetbutton.addEventListener("click", reset);
lapClearButton.addEventListener("click", () => {
    lapsList.innerHTML = ""; 
    lapEntries.splice(0, lapEntries.length);
    lapNumber = 1; 
});

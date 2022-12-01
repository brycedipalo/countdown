const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl  = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const resetBtn = document.getElementById('reset-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const newCountDown = document.getElementById('new-countdown-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute *60;
const day = hour *24;

//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

function updateDOM() {
    countdownActive = setInterval(() =>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/minute);
        const seconds = Math.floor((distance % minute)/second);

        inputContainer.hidden = true;
        if(distance < 0){  
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }else{
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        } 
    }, second);
}



function submitCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if (countdownTitle === ''){ 
        alert('Please select a title for the countdown');
    }else{
        if (countdownDate === '') {
            alert('Please select a date for the countdown');
        }else{    
            countdownValue = new Date(countdownDate).getTime();
            updateDOM();
        }
    }
}

function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate =  '';
    localStorage.removeItem('countdown');

    
}

function restorePreviousCountdown() {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit',submitCountdown);
resetBtn.addEventListener('click', reset);
newCountDown.addEventListener('click', reset);
restorePreviousCountdown();
// Selectores | selectors
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const formElement = document.querySelector('.calculator__form');
const btnElement = document.querySelector('.calculator__button');
const dayspan = document.querySelector('.calculator__span--day');
const yearspan = document.querySelector('.calculator__span--year');
const monthspan = document.querySelector('.calculator__span--month');

// Variables
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

eventListeners();
function eventListeners(){
    formElement.addEventListener('submit', initApp);
    dayInput.addEventListener('input', validateDay);
    monthInput.addEventListener('input', validateMonth);
    yearInput.addEventListener('input', validateYear);
}

function initApp(e){
    e.preventDefault();

    if(validateDay() && validateMonth() && validateYear()){
        if(dayInput.value > day){
            day = day + monthArray[month - 1];
            month = month - 1;
        }

        if(monthInput.value > month){
            month = month + 12;
            year = year - 1;
        }

        dayspan.textContent = day - dayInput.value;
        monthspan.textContent = month - monthInput.value;
        yearspan.textContent = year - yearInput.value;
    }else{
        dayspan.textContent = '--';
        monthspan.textContent = '--';
        yearspan.textContent = '--';
    }
}

function validation(error, element, label, msgElement, msg){
    if(!error){
        element.classList.remove('error');
        label.classList.remove('error');
    }else{
        element.classList.add('error');
        label.classList.add('error');
    }

    msgElement.textContent = msg;
}

function validateDay(){
    const value = parseInt(dayInput.value);
    const parent = dayInput.parentElement;
    const label = parent.querySelector('.calculator__label');
    const message = parent.querySelector('.calculator__message');
    
    if(!value || typeof(value) !== 'number'){
        validation(true, dayInput, label, message, 'This field is required');
        return false;
    }else if(value > 31){
        validation(true, dayInput, label, message, 'Must be a valid day');
        return false;
    }else{
        validation(false, dayInput, label, message, '');
        return true;
    }
}


function validateMonth(){
    const value = parseInt(monthInput.value);
    const parent = monthInput.parentElement;
    const label = parent.querySelector('.calculator__label');
    const message = parent.querySelector('.calculator__message');
    
    if(!value || typeof(value) !== 'number'){
        validation(true, monthInput, label, message, 'This field is required');
        return false;
    }else if(value > 12){
        validation(true, monthInput, label, message, 'Must be a valid month');
        return false;
    }else{
        validation(false, monthInput, label, message, '');
        return true;
    }
}

function validateYear(){
    const value = parseInt(yearInput.value);
    const parent = yearInput.parentElement;
    const label = parent.querySelector('.calculator__label');
    const message = parent.querySelector('.calculator__message');
    
    if(!value || typeof(value) !== 'number'){
        validation(true, yearInput, label, message, 'This field is required');
        return false;
    }else if(value > year){
        validation(true, yearInput, label, message, 'Must be in the past');
        return false;
    }else{
        validation(false, yearInput, label, message, '');
        return true;
    }
}


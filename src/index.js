import './css/styles.css';
import Notiflix from 'notiflix';
console.log(Notiflix)

const debounce = require('lodash.debounce');
console.log(debounce)

const DEBOUNCE_DELAY = 300;
console.log(DEBOUNCE_DELAY)

const inputEl = document.querySelector('input[id=search-box]')
console.log(inputEl)

Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
Notiflix.Notify.failure('Oops, there is no country with that name');

fetch('https://restcountries.com/v3.1/name/united').then(response => {
    return response.json();
}).then(country => {
    console.log(country);
}).catch(error => {
    console.log(error);
})

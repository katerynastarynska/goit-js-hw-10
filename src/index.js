import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input[id=search-box]');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountrySearch, DEBOUNCE_DELAY));

function onInputCountrySearch(e) {
    resetSearchResults();
    const countryOnSearch = e.target.value.trim().toLowerCase();
    if (countryOnSearch === "" || countryOnSearch === undefined) {
        resetSearchResults()
        return;
    }
    API.fetchCountries(countryOnSearch)
        .then(renderCountriesMarkup)
        .catch(error => console.log(error));
        resetSearchResults();
}
let markUp = "";
function renderCountriesMarkup(countriesArray) {
  
    if (countriesArray.length > 10) {
        resetSearchResults();
        Notify.info('Too many matches found. Please enter a more specific name');
    }
    else if (countriesArray.length >= 2 && countriesArray.length < 10) {
        resetSearchResults();
        markUp = countriesArray.map((country) => {
            return `<li class = "list"><h2><span><img src ="${country.flags.svg}" alt ="national flag" width ="30"></span> 
            ${country.name.official}</h2></li>
            `}).join(" ");
        countryListEl.insertAdjacentHTML("beforeend", markUp);

    }
    else if (countriesArray.length === 1) {
        resetSearchResults();
        markUp = countriesArray.map((country) => {
            return `<h1><span><img src ="${country.flags.svg}" alt ="national flag" width ="50"></span> ${country.name.official}</h1>
            <h2>Capital: ${country.capital[0]}</h2>
            <h2>Population: ${country.population}</h2> 
            <h2>Languages: ${Object.values(country.languages)}</h2>`;

        })
        countryListEl.insertAdjacentHTML("beforeend", markUp);
    }
}

function resetSearchResults() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}
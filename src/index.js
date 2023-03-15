import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const notifyOptions = {
    showOnlyTheLastOne: true,
    cssAnimationStyle: 'from-right',
    width: '360px',
}

searchBox.addEventListener('input', debounce(() => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    const name = searchBox.value.trim();
    if (name === '') return;
    fetchCountries(name)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', notifyOptions)
            }
            else if (data.length === 1) {

                renderCountryInfo(data)
                console.log(data)
            }
            else {
                renderCountryList(data);
            }
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.failure('Oops, there is no country with that name', notifyOptions);
        })
}, DEBOUNCE_DELAY))

const renderCountryList = (countries) => {
    const markup = countries
        .map((country) => `<li class="country__item"><div class="country__wrapper"><img class="country__image" src="${country.flags.svg}"></div><p class="country__name">${country.name.common}</p>`)
        .join('');

    countryList.insertAdjacentHTML('beforeend', markup)
}



const renderCountryInfo = (country) => {
    const markup = country
        .map((country) =>
            `<div class="info__flag"><img class="info__image" src="${country.flags.svg}"></div>
         <h2>${country.name.official}</h2>    
         <h3><span>Capital: </spam>${country.capital}</h3>
         <h3><span>Population: </spam>${country.population}</h3>
         <h3><span>Languages: </spam>${Object.values(country.languages)}</h3> `)
        .join('')
    countryInfo.insertAdjacentHTML('beforeend', markup)
}



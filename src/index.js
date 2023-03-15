import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 500;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(() => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    const name = searchBox.value;
    console.log(name)
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=,name,official,capital,languages,flags,population`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.status);
        })
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
            else if (data.length === 1) {

                renderCountryInfo(data)
                console.log(data)
            }
            else {
                renderCountryList(data);
            }
        })
        .catch(err => console.log(err))
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












// searchBox.addEventListener('input', debounce(e => {
//     console.log(searchBox.value)
//     const inputvalue = searchBox.value
//     if (inputvalue === '') return;
//     fetchCountries()
//         .then(data => {
//             console.log(searchBox.value)
//             console.log(data.json())
//         })






// }, DEBOUNCE_DELAY)
// )
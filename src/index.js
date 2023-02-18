import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const searchName = e.target.value.trim();

  if (!searchName) {
    dataCleaning();
    return;
  } else {
    fetchCountries(searchName)
      .then(countries => {
        countries.length > 10
          ? Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            )
          : onRenderCountryList(countries);
      })
      .catch(onFetchError);
  }
}

function onRenderCountryList(countries) {
  dataCleaning();
  const markup = countries
    .map(
      country => `<li class ="country-item">
       <img src="${country.flags.svg}" alt="${country.name.oficial}" width = "40px" heignt = "40px">
       </img> <span> ${country.name.official} </span>
     </li>`
    )
    .join('');
  countryList.innerHTML = markup;

  if (countries.length === 1) {
    countryList.classList.add('country-list--big');
    createCountryCard(countries);
  }
}

function createCountryCard(countries) {
  const country = countries[0];
  countryCard.innerHTML = ` <p>Capital:<span> ${country.capital}</span></p> 
  <p>Population:<span> ${country.population}</span></p>
  <p>Languages:<span> ${Object.values(country.languages)}</span></p>`;
}

function onFetchError(error) {
  dataCleaning();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function dataCleaning() {
  countryList.innerHTML = '';
  countryCard.innerHTML = '';
  countryList.classList.remove('country-list--big');
}

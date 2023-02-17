import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 3000;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const searchName = e.target.value.trim();
  console.log(searchName);

  if (searchName === '') {
    return;
  } else {
    fetchCountries(searchName)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          onRenderCountryCard(countries);
        }
      })
      .catch(onFetchError);
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onRenderCountryCard(countries) {
  // if (countries.length > 2) {
  //   makeCountryList(countries);
  // }
  // console.log('hello');
  // makeCountryCard(countries);
  makeCountryList(countries);
  if (countries.length === 1) {
    countryList.classList.add('country');
    makeCountryCard(countries);
  }
}

function makeCountryList(countries) {
  console.log('make item');

  const markup = countries
    .map(
      country => `<li class ="country-item">
       <img src="${country.flags.svg}" alt="${country.name.oficial}" width = "40px" height="40px">
       </img> <span> ${country.name.official} </span>
     </li>`
    )
    .join('');
  console.log(markup);

  countryList.insertAdjacentHTML('beforeend', markup);
}

function makeCountryCard(countries) {
  const country = countries[0];
  countryCard.innerHTML = ` <p>Capital:<span> ${country.capital}</span></p> 
  <p>Population:<span> ${country.population}</span></p>
  <p>Languages:<span> ${Object.values(country.languages)}</span></p>`;
}
//  <body>
//     <input type="text" id="search-box" />
//    <ul class="country-list">
//      <li>
//        <img src="" alt="">
//        </img> <span></span>
//      </li>
//     </ul>
//    <div class="country-info">

//     </div>

//     <script src="index.js" type="module"></script>
//   </body>
// // </html>
// <span></span>

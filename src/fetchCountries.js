import { Notify } from 'notiflix/build/notiflix-notify-aio';
    
    function fetchCountries(countryOnSearch) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';    
    return fetch(`${BASE_URL}/${countryOnSearch}?fields=name,capital,population,flags,languages`)
    .then(response => {
          if (response.status === 200) {
            return response.json()  
        } else if (response.status === 404) {
           return Promise.reject(Notify.failure('Oops, there is no country with that name'));
           }
        })
}

export default { fetchCountries }
const fetchCountries = name => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=,name,official,capital,languages,flags,population`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.status);
        })
}
export { fetchCountries };
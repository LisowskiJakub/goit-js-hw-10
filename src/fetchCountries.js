


const fetchCountries = name => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=,name`)
        .then(resp => {
            console.log(resp)
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        })
        .catch(err => {
            console.error(err)
        })
}

export { fetchCountries };
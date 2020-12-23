export const CountryData = {
    countries: '',
    fetching: function() {
        fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.countries = data;
        });
    },
}



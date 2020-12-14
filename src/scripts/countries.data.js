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
/* Метод подтягивает данные с API, в переменной countries хранится массив с объектами,
 в которых есть название страны, ссылка на картинку с её флагом и количество населения */

 


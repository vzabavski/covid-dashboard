export const StatsData = {
    
    getInfo: function(countryName = 'Belarus', mode = 'world') {
        let param = countryName.replace(/ /gi, '-').toLowerCase()
        switch(mode) {
          case 'total by country': fetch(`https://api.covid19api.com/total/country/${param}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.countryTotalConfirmed = data[data.length - 1].Confirmed;
              this.countryTotalRecovered = data[data.length - 1].Recovered;
              this.countryTotalDeaths = data[data.length - 1].Deaths;
              /* Добавить функцию заполения таблицы*/
            });
            break;
          case 'live by country': fetch(`https://api.covid19api.com/live/country/${param}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.countryLiveConfirmed = data[data.length - 1].Confirmed;
              this.countryLiveRecovered = data[data.length - 1].Recovered;
              this.countryLiveDeaths = data[data.length - 1].Deaths;
              /* Добавить функцию заполения таблицы */
            });
            break;
          default: fetch(`https://api.covid19api.com/summary`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.worldTotalConfirmed = data['Global']["TotalConfirmed"];
              this.worldTotalRecovered = data['Global']["TotalRecovered"];
              this.worldTotalDeaths = data['Global']["TotalDeaths"];
              this.worldLiveConfirmed = data['Global']["NewConfirmed"];
              this.worldLiveRecovered = data['Global']["NewRecovered"];
              this.worldLiveDeaths = data['Global']["NewDeaths"];
              /* Добавить функцию заполения таблицы */
            });
        }
    },
}


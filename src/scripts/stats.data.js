const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const fetchInfo = (countryName = 'Belarus', mode = 'world') => {
  let param = countryName.replace(/ /gi, '-').toLowerCase();
  let data;
  if (mode === 'world') {
    data = fetch(`https://api.covid19api.com/summary`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch(error => console.log('error', error));
  } else {
    data = fetch(`https://api.covid19api.com/${mode}/country/${param}`)
    .then((response) => {
      return response.json();
    })
    .catch(error => console.log('error', error)); 
  }
  return data;
}


export async function getInfo(country, mode) {
  const result = await fetchInfo(country, mode);

  let statistic = {};

  if(country) {
      statistic.confirmed = result[result.length - 1]['Confirmed'];
      statistic.recovered = result[result.length - 1]['Recovered'];
      statistic.deaths = result[result.length - 1]['Deaths'];
  } else {
      statistic.allData = result;
      statistic.worldTotalConfirmed = result['Global']["TotalConfirmed"];
      statistic.worldTotalRecovered = result['Global']["TotalRecovered"];
      statistic.worldTotalDeaths = result['Global']["TotalDeaths"];
      statistic.worldLiveConfirmed = result['Global']["NewConfirmed"];
      statistic.worldLiveRecovered = result['Global']["NewRecovered"];
      statistic.worldLiveDeaths = result['Global']["NewDeaths"];
  } 
  return statistic;
}

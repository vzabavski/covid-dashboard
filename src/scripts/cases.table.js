const searchInput = document.querySelector('.form__input')
let searchTerm = ''
let tableMode = 'Total cases'
async function getInfo(url = 'https://api.covid19api.com/summary', url1 = 'https://corona.lmao.ninja/v2/countries', mode = 'Total cases') {
  let sortingValue = mode
  const response = await fetch(url)
  const response1 = await fetch(url1)
  const data = await response.json()
  const data1 = await response1.json()
  let covidData = [...data.Countries]
  let PopulationData = [...data1]
  // add needed info from different API's to covidData (to the HEAP object)
  for (let i = 0; i < covidData.length; i++) {
    for (let j = 0; j < PopulationData.length; j++) {
      if (covidData[i].Country.toLowerCase() === PopulationData[j].country.toLowerCase()) {
        covidData[i].population = PopulationData[j].population
      }
    }
  }

  if (data && data1) {
    drawTable(covidData, sortingValue)
  }
}
getInfo()

function drawTable(data, sortedMode) {
  if (document.querySelector('table')) {
    document.querySelector('table').remove();
  }
  const statistic = document.createElement('table');
  statistic.className = 'statistic-table'
  document.querySelector('.list__nav').append(statistic);
  data
    .filter(country => country.Country.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((country) => {
      const tableTopicRow = document.createElement('tr');
      if (country.population !== 0) {
        switch (sortedMode) {
          case 'Total cases':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.TotalConfirmed}</td>`)
            break;
          case 'Total deaths':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.TotalDeaths}</td>`)
            break;
          case 'Total recovered':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.TotalRecovered}</td>`)
            break;
          case 'Today cases':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.NewConfirmed}</td>`)
            break;
          case 'Today deaths':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.NewDeaths}</td>`)
            break;
          case 'Today recovered':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.NewRecovered}</td>`)
            break;
          case 'Total cases per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.TotalConfirmed, country.population)}</td>`)
            break;
          case 'Total deaths per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.TotalDeaths, country.population)}</td>`)
            break;
          case 'Total recovered per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.TotalRecovered, country.population)}</td>`)
            break;
          case 'Today cases per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.NewConfirmed, country.population)}</td>`)
            break;
          case 'Today deaths per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.NewDeaths, country.population)}</td>`)
            break;
          case 'Today recovered per 100.000 population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${countTotalPerValue(country.NewRecovered, country.population)}</td>`)
            break;
          default:
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td><img src="https://disease.sh/assets/img/flags/${country.CountryCode.toLowerCase()}.png" alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.Country}</td><td class="cases-column" >${country.TotalConfirmed}</td>`)
        }
      }
    })
  // table sorting by cases
  let countryCases = document.querySelectorAll('tr.table-topic');
  countryCases = Array.prototype.slice.call(countryCases);
  countryCases.sort(function (a, b) {
    return +b.lastChild.innerHTML - (+a.lastChild.innerHTML);
  });
  countryCases.map(item => {
    let parent = item.parentNode;
    let detatchedItem = parent.removeChild(item);
    parent.append(detatchedItem);
  })
}
// count cases per 100.000 people
function countTotalPerValue(cases, population) {
  return (cases / population) ? (cases / population * 100000).toFixed(0) : 0
}
// search country by filtered letters
searchInput.addEventListener('input', (e) => searchCountry(e.target.value))
function searchCountry(letter) {
  searchTerm = letter;
  getInfo('https://api.covid19api.com/summary', 'https://corona.lmao.ninja/v2/countries', tableMode)
}
// function DOM elements filler
function fillUpElement(element, selector, cssClass, inner = '', event, callback) {
  document.querySelectorAll(selector).forEach((item) => {
    item.append(element);
  });
  element.className = cssClass;
  element.innerHTML = inner;
  element.addEventListener(event, callback);
}
// select type of sorting
document.querySelector('.select').addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    tableMode = e.target.dataset.value
    getInfo('https://api.covid19api.com/summary', 'https://corona.lmao.ninja/v2/countries', e.target.dataset.value)
  }
})

//https://corona-api.com/countries
//https://corona.lmao.ninja/v2/countries
//https://api.covid19api.com/summary

export { searchInput, searchCountry }

















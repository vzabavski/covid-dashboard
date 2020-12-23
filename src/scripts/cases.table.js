import '../styles/style.css'
import getInf from './table.js'
const searchInput = document.querySelector('.form__input')
let countryData = {}
let searchTerm = ''
let tableMode = 'Total cases'

async function getCountryInfo(url = 'https://disease.sh/v3/covid-19/countries', url1 = 'https://corona.lmao.ninja/v2/countries', mode = 'Total cases') {
  let sortingValue = mode
  const response = await fetch(url)
  const response1 = await fetch(url1)
  const data = await response.json()
  const data1 = await response1.json()
  let covidData = [...data]
  let PopulationData = [...data1]
  let total = 0
  covidData.map((a) => total += a.cases)

  // add needed info from different API's to covidData (to the HEAP object)
  for (let i = 0; i < covidData.length; i++) {
    for (let j = 0; j < PopulationData.length; j++) {
      if (covidData[i].country.toLowerCase() === PopulationData[j].country.toLowerCase()) {
        covidData[i].population = PopulationData[j].population
      }
    }
  }
  console.log(covidData)
  drawTable(covidData, sortingValue)
  document.querySelector('.global__cases').innerText = total
}
getCountryInfo()

function drawTable(data, sortedMode) {
  if (document.querySelector('table.statistic-table')) {
    document.querySelector('table.statistic-table').remove();
  }

  let statistic = new DOMelement('table', '.list__nav', 'statistic-table', '', 'click', () => getCountryInfo())
  let tableTopicRow
  data
    .filter(country => country.country.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((country) => {
      if (country.population !== 0) {
        switch (sortedMode) {
          case 'Total cases':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total deaths':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.deaths}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total recovered':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.recovered}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today cases':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayCases}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today deaths':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayDeaths}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today recovered':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayRecovered}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total cases per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.cases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total deaths per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.deaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total recovered per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.recovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today cases per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayCases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today deaths per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayDeaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today recovered per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayRecovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          default:
            tableTopicRow = new DOMelement('tr', 'table.statistic-table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })
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

  function getCountryInfo(e) {
    data.map(country => {
      if (country.country === e.currentTarget.children[1].innerHTML) {
        countryData = country
        console.log(countryData)
        getInf('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', countryData.country)
        return country
      }
    })
  }
  return tableTopicRow, statistic
}

// count cases per 100.000 people
function countTotalPerValue(cases, population) {
  return (cases / population) ? (cases / population * 100000).toFixed(0) : 0
}
// search country by filtered letters
searchInput.addEventListener('input', (e) => searchCountry(e.target.value))
function searchCountry(letter) {
  searchTerm = letter;
  getCountryInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', tableMode)
}

// select type of sorting
document.querySelector('.select').addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    tableMode = e.target.dataset.value
    getCountryInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', e.target.dataset.value)
  }
})

//create and fill DOM element
class DOMelement {
  constructor(tagName = 'div', selector, className = '', inner = '', event, callback) {
    let el = document.createElement(tagName);
    document.querySelectorAll(selector).forEach((item) => { item.append(el) })
    el.className = className;
    el.innerHTML = inner
    el.addEventListener(event, callback);
    this.node = el;
  }
}
export { searchInput, searchCountry }

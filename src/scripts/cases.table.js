const searchInput = document.querySelector('.form__input')
let searchTerm = ''
let tableMode = 'Total'
async function getInfo(url = 'https://corona.lmao.ninja/v2/countries', mode = 'Total') {
  let sortingValue = mode
  const response = await fetch(url)
  const data = await response.json()
  if (data) {
    drawTable(data, sortingValue)
  }
}
getInfo()

function drawTable(data, sortedMode) {
  console.log(data)
  console.log(sortedMode)
  if (document.querySelector('table')) {
    document.querySelector('table').remove();
  }
  const statistic = document.createElement('table');
  statistic.className = 'statistic-table'
  const tableHeadRow = document.createElement('tr');
  document.querySelector('.list__nav').append(statistic);
  fillUpElement(tableHeadRow, 'table', 'table-head', '<th>№</th><th>Flag</th><th>Country</th><th>Cases</th>')
  data
    .filter(country => country.country.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((country, index) => {
      const tableTopicRow = document.createElement('tr');
      if(country.population !== 0){
        switch (sortedMode) {
          case 'Total':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`)
            break;
          case 'Of the last day':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayCases}</td>`)
            break;
          case 'Total per on 100 thousand population':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.casesPerOneMillion)}</td>`)
            break;
          case 'Based on 100 thousand population of the last day':
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTodayPerValue(country.todayCases, country.population)}</td>`)
            break;
          default:
            fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`)
        }
      }
      
    })
}

function countTotalPerValue(casesPerMillion) {
  return (casesPerMillion / 10) ? (casesPerMillion / 10).toFixed(0) : 0
}

function countTodayPerValue(cases, number) {
  return (cases / number) ? (cases / number * 100000).toFixed(0) : 0
}

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  getInfo('https://corona.lmao.ninja/v2/countries', tableMode)
})


function fillUpElement(element, selector, cssClass, inner = '', event, callback) {
  document.querySelectorAll(selector).forEach((item) => {
    item.append(element);
  });
  element.className = cssClass;
  element.innerHTML = inner;
  element.addEventListener(event, callback);
}

document.querySelector('.select').addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    getInfo('https://corona.lmao.ninja/v2/countries', e.target.dataset.value)
  }
  console.log(e.target.dataset.value)
})


async function getIn(url = 'https://api.covid19api.com/summary') {

  const response = await fetch(url)
  const data = await response.json()
console.log(data)
}

getIn()




















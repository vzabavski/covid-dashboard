async function getInfo(url ='https://corona.lmao.ninja/v2/countries' ) {
  const response = await fetch(url)
  const data = await response.json()
  if (data) {
    drawTable(data)
  }
}
getInfo()

let searchTerm = ''


const searchInput = document.querySelector('.form__input')
function drawTable(data) {
  if (document.querySelector('table')) {
    document.querySelector('table').remove();
  }
  const statistic = document.createElement('table');
  const tableHeadRow = document.createElement('tr');
  document.querySelector('.list__nav').append(statistic);
  fillUpElement(tableHeadRow, 'table', 'table-head', '<th>№</th><th>Flag</th><th>Country</th><th>Cases</th>')
  data
  .filter(country => country.country.toLowerCase().includes(searchTerm.toLowerCase()))
  .map((country, index) => {
    const tableTopicRow = document.createElement('tr');
    fillUpElement(tableTopicRow, 'table', 'table-topic', `<td>${index + 1}</td><td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td>${country.cases}</td>`)
  })

}
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  getInfo()
})


function fillUpElement(element, selector, cssClass, inner = '', event, callback) {
  document.querySelectorAll(selector).forEach((item) => {
    item.append(element);
  });
  element.className = cssClass;
  element.innerHTML = inner;
  element.addEventListener(event, callback);
}

































/*let countries
const fetchCountries = async () => {
 countries = await fetch('https://corona.lmao.ninja/v2/countries')
 .then(res => res.json())
}
const showCountries = async () => {
    results.innerHTML = '';
    await fetchCountries();
    countries.forEach(name=> console.log(name))
  }
  showCountries()*/
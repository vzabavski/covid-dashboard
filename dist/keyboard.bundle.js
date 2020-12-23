/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./scripts/cases.table.js
const searchInput = document.querySelector('.form__input')
let countryData = {}
let searchTerm = ''
let tableMode = 'Total cases'

async function getInfo(url = 'https://disease.sh/v3/covid-19/countries', url1 = 'https://corona.lmao.ninja/v2/countries', mode = 'Total cases', countryInfo) {
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
 //-----------ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ--------//
  if (!countryInfo) {
    drawTable(covidData, sortingValue)
  }else if(countryInfo){
  drawTable([countryInfo], sortingValue)
  }
  document.querySelector('.global__cases').innerText = total
}
getInfo()

function drawTable(data, sortedMode) {
  if (document.querySelector('table')) {
    document.querySelector('table').remove();
  } 
    //ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ
  let statistic = new DOMelement('table','.list__nav','statistic-table','', 'click', () => getInfo())
  let tableTopicRow
  data
    .filter(country => country.country.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((country) => {
      if (country.population !== 0) {
        switch (sortedMode) {
          case 'Total cases':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total deaths':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.deaths}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total recovered':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.recovered}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today cases':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayCases}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today deaths':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayDeaths}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today recovered':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.todayRecovered}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total cases per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.cases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total deaths per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.deaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Total recovered per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.recovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today cases per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayCases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today deaths per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayDeaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          case 'Today recovered per 100.000 population':
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${countTotalPerValue(country.todayRecovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })
            break;
          default:
            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt="flag" style ="width: 75px;height: 50px;"></td><td>${country.country}</td><td class="cases-column" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })
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
            //ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ СОБЫТИЕ С КЛИКА ПО ЭЛЕЕМНТУ
        //getInfo(https://disease.sh/v3/covid-19/countries, 'https://corona.lmao.ninja/v2/countries',tableMode , countryData)
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
  getInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', tableMode)
}

// select type of sorting
document.querySelector('.select').addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    tableMode = e.target.dataset.value
    getInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', e.target.dataset.value)
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
//https://corona-api.com/countries
//https://corona.lmao.ninja/v2/countries
//https://api.covid19api.com/summary
//https://disease.sh/v3/covid-19/countries



;// CONCATENATED MODULE: ./scripts/keyboard.js


document.querySelector('.btn-keyboard').addEventListener('click', () => {
    document.querySelector('.keyboard').classList.toggle('hidden')
})

const number = document.querySelectorAll('.btn');
const shift__btn = document.querySelector('.shift__btn');
const caps = document.querySelector('.caps');
const BackSpace = document.querySelector('.top__btn');
let CurrentLetter;
let Caps = false;
let Shift = false;
let arrEnShift = {
    "65": 'A', "66": 'B', "67": 'C', "68": 'D', "69": 'E', "70": 'F', "71": 'G',
    "72": 'H', "73": 'I', "74": 'J', "75": 'K', "76": 'L', "77": 'M', "78": 'N', "79": 'O',
    "80": 'P', "81": 'Q', "82": 'R', "83": 'S', "84": 'T', "85": 'U', "86": 'V', "87": 'W',
    "88": 'X', "89": 'Y', "90": 'Z', "186": ':', "188": '<', "190": '>', "219": '{', "221": '}',
    "191": '?', "192": '~', '32': " ", "49": '!', "50": '@', "51": '#', "52": '$',
    "53": '%', "54": '^', "55": '&', "56": '*', "57": '(', "48": ')', "189": '_', "187": '+', "13": '\n', "220": '|'
}

let arrEn = {
    "65": 'a', "66": 'b', "67": 'c', "68": 'd', "69": 'e', "70": 'f', "71": 'g',
    "72": 'h', "73": 'i', "74": 'j', "75": 'k', "76": 'l', "77": 'm', "78": 'n', "79": 'o',
    "80": 'p', "81": 'q', "82": 'r', "83": 's', "84": 't', "85": 'u', "86": 'v', "87": 'w',
    "88": 'x', "89": 'y', "90": 'z', "186": ';', "188": ',', "190": '.', "219": '[', "221": ']',
    "222": '\'', "191": '/', "192": '`', '32': " ", "49": '1', "50": '2', "51": '3', "52": '4',
    "53": '5', "54": '6', "55": '7', "56": '8', "57": '9', "48": '0', "189": '-', "187": '=', "13": '\n', "220": '\\'
}

// to fill the buttuns
function buttonTxt() {
    number.forEach(function (num) {
        let ButtonText
        if (Shift === false && Caps === false) {
            ButtonText = arrEn[num.attributes[0].value]
        } else if (Shift === true && Caps === true) {
            ButtonText = arrEnShift[num.attributes[0].value].toLowerCase()
        } else if (Shift === true && Caps === false) {
            ButtonText = arrEnShift[num.attributes[0].value]
        } else if (Shift === false && Caps === true) {
            ButtonText = arrEn[num.attributes[0].value].toUpperCase()
        }
        num.innerHTML = ButtonText
        document.querySelector(".space__btn").innerHTML = "Space"
        document.querySelector(".top__btn").innerHTML = "Back"
        return num.innerHTML
    })
}
buttonTxt()
//Add eventhandler to buttons
number.forEach(function (num) {
    num.addEventListener('click', function (arg) {
        clearProp();
        let letterNum = arg.target.attributes[0].value;
        numberFunc(letterNum);

    });
});
let numberFunc = (number) => {
    searchInput.focus()
    let tempLetter;
    if (Shift === true) {
        for (let key in arrEnShift) {
            if (number === key) {
                tempLetter = arrEnShift[key];
                CurrentLetter = tempLetter;
            }
        }
    } else if (Shift === false) {
        for (let key in arrEn) {
            if (number === key) {
                tempLetter = arrEn[key];
                CurrentLetter = tempLetter;
            }
        }
    }

    curString()
}

// Sharing event with the screen
function curString() {
    let tempLetter = CurrentLetter;
    if (Caps === true && Shift === false) {
        searchInput.value += tempLetter.toUpperCase();
    }
    else if (Caps === true && Shift === true) {
        searchInput.value += tempLetter.toLowerCase();
    } else if (Shift === true && Caps === false) {
        searchInput.value += tempLetter.toUpperCase();
    }
    else if (Caps === false && Shift === false) {
        searchInput.value += tempLetter;
    }
    searchCountry(searchInput.value)
}



function clearProp() {
    number.forEach(number => number.classList.remove('key-press'))
}

// CapsLock
function capsFunc() {
    searchInput.focus()
    if (Caps === false) {
        Caps = true;
        buttonTxt()
        document.querySelector(".caps").style.border = "3px solid #FE8E25";
    } else if (Caps === true) {
        Caps = false;
        buttonTxt()
        document.querySelector(".caps").style.border = "1px solid #388663";
    }
    return Caps
}
//Shift
function shiftFunc() {
    buttonTxt()
    searchInput.focus()
    if (Shift === false) {
        document.querySelector(".shift__btn").style.border = "3px solid #FE8E25";
        Shift = true;
        buttonTxt()
    } else if (Shift === true) {
        document.querySelector(".shift__btn").style.border = "1px solid #388663";
        Shift = false;
        buttonTxt()
    }
}
// BackSpasce
function backSp() {
    searchInput.focus()
    if (searchInput.textLength === searchInput.selectionEnd) {
        searchInput.value = searchInput.value.slice(0, searchInput.selectionEnd - 1)
    } else {
        searchInput.value = searchInput.value.slice(0, searchInput.selectionEnd - 1) + searchInput.value.slice(searchInput.selectionEnd);
    }
    searchCountry(searchInput.value)
}
BackSpace.addEventListener('click', backSp);
shift__btn.addEventListener('click', shiftFunc);
caps.addEventListener('click', capsFunc);

/******/ })()
;
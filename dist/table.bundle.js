/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/cases.table.js":
/*!********************************!*\
  !*** ./scripts/cases.table.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchInput\": () => /* binding */ searchInput,\n/* harmony export */   \"searchCountry\": () => /* binding */ searchCountry\n/* harmony export */ });\nconst searchInput = document.querySelector('.form__input')\r\nlet countryData = {}\r\nlet searchTerm = ''\r\nlet tableMode = 'Total cases'\r\n\r\nasync function getInfo(url = 'https://disease.sh/v3/covid-19/countries', url1 = 'https://corona.lmao.ninja/v2/countries', mode = 'Total cases', countryInfo) {\r\n  let sortingValue = mode\r\n  const response = await fetch(url)\r\n  const response1 = await fetch(url1)\r\n  const data = await response.json()\r\n  const data1 = await response1.json()\r\n  let covidData = [...data]\r\n  let PopulationData = [...data1]\r\n  let total = 0\r\n  covidData.map((a) => total += a.cases)\r\n\r\n  // add needed info from different API's to covidData (to the HEAP object)\r\n  for (let i = 0; i < covidData.length; i++) {\r\n    for (let j = 0; j < PopulationData.length; j++) {\r\n      if (covidData[i].country.toLowerCase() === PopulationData[j].country.toLowerCase()) {\r\n        covidData[i].population = PopulationData[j].population\r\n      }\r\n    }\r\n  }\r\n  console.log(covidData)\r\n //-----------ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ--------//\r\n  if (!countryInfo) {\r\n    drawTable(covidData, sortingValue)\r\n  }else if(countryInfo){\r\n  drawTable([countryInfo], sortingValue)\r\n  }\r\n  document.querySelector('.global__cases').innerText = total\r\n}\r\ngetInfo()\r\n\r\nfunction drawTable(data, sortedMode) {\r\n  if (document.querySelector('table')) {\r\n    document.querySelector('table').remove();\r\n  } \r\n    //ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ\r\n  let statistic = new DOMelement('table','.list__nav','statistic-table','', 'click', () => getInfo())\r\n  let tableTopicRow\r\n  data\r\n    .filter(country => country.country.toLowerCase().includes(searchTerm.toLowerCase()))\r\n    .map((country) => {\r\n      if (country.population !== 0) {\r\n        switch (sortedMode) {\r\n          case 'Total cases':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Total deaths':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.deaths}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Total recovered':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.recovered}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today cases':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.todayCases}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today deaths':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.todayDeaths}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today recovered':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.todayRecovered}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Total cases per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.cases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Total deaths per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.deaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Total recovered per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.recovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today cases per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.todayCases, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today deaths per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.todayDeaths, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          case 'Today recovered per 100.000 population':\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${countTotalPerValue(country.todayRecovered, country.population)}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n            break;\r\n          default:\r\n            tableTopicRow = new DOMelement('tr', 'table', 'table-topic', `<td><img src=${country.countryInfo.flag} alt=\"flag\" style =\"width: 75px;height: 50px;\"></td><td>${country.country}</td><td class=\"cases-column\" >${country.cases}</td>`, 'click', (e) => { getCountryInfo(e) })\r\n        }\r\n      }\r\n    })\r\n  // table sorting by cases\r\n  let countryCases = document.querySelectorAll('tr.table-topic');\r\n  countryCases = Array.prototype.slice.call(countryCases);\r\n  countryCases.sort(function (a, b) {\r\n    return +b.lastChild.innerHTML - (+a.lastChild.innerHTML);\r\n  });\r\n  countryCases.map(item => {\r\n    let parent = item.parentNode;\r\n    let detatchedItem = parent.removeChild(item);\r\n    parent.append(detatchedItem);\r\n  })\r\n\r\n  function getCountryInfo(e) {\r\n    data.map(country => {\r\n      if (country.country === e.currentTarget.children[1].innerHTML) {\r\n        countryData = country\r\n        console.log(countryData)\r\n            //ЕСЛИ НАДО ОСТАВИТЬ ЕСЛИ НЕТ-УБРАТЬ СОБЫТИЕ С КЛИКА ПО ЭЛЕЕМНТУ\r\n        //getInfo(https://disease.sh/v3/covid-19/countries, 'https://corona.lmao.ninja/v2/countries',tableMode , countryData)\r\n        return country\r\n      }\r\n    })\r\n  }\r\n  return tableTopicRow, statistic\r\n}\r\n\r\n// count cases per 100.000 people\r\nfunction countTotalPerValue(cases, population) {\r\n  return (cases / population) ? (cases / population * 100000).toFixed(0) : 0\r\n}\r\n// search country by filtered letters\r\nsearchInput.addEventListener('input', (e) => searchCountry(e.target.value))\r\nfunction searchCountry(letter) {\r\n  searchTerm = letter;\r\n  getInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', tableMode)\r\n}\r\n\r\n// select type of sorting\r\ndocument.querySelector('.select').addEventListener('click', (e) => {\r\n  if (e.target.dataset.value) {\r\n    tableMode = e.target.dataset.value\r\n    getInfo('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', e.target.dataset.value)\r\n  }\r\n})\r\n//create and fill DOM element\r\nclass DOMelement {\r\n  constructor(tagName = 'div', selector, className = '', inner = '', event, callback) {\r\n    let el = document.createElement(tagName);\r\n    document.querySelectorAll(selector).forEach((item) => { item.append(el) })\r\n    el.className = className;\r\n    el.innerHTML = inner\r\n    el.addEventListener(event, callback);\r\n    this.node = el;\r\n  }\r\n}\r\n//https://corona-api.com/countries\r\n//https://corona.lmao.ninja/v2/countries\r\n//https://api.covid19api.com/summary\r\n//https://disease.sh/v3/covid-19/countries\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/cases.table.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./scripts/cases.table.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
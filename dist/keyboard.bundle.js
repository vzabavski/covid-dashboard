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

/***/ }),

/***/ "./scripts/keyboard.js":
/*!*****************************!*\
  !*** ./scripts/keyboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cases_table_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cases.table.js */ \"./scripts/cases.table.js\");\n\r\n\r\ndocument.querySelector('.btn-keyboard').addEventListener('click', () => {\r\n    document.querySelector('.keyboard').classList.toggle('hidden')\r\n})\r\n\r\nconst number = document.querySelectorAll('.btn');\r\nconst shift__btn = document.querySelector('.shift__btn');\r\nconst caps = document.querySelector('.caps');\r\nconst BackSpace = document.querySelector('.top__btn');\r\nlet CurrentLetter;\r\nlet Caps = false;\r\nlet Shift = false;\r\nlet arrEnShift = {\r\n    \"65\": 'A', \"66\": 'B', \"67\": 'C', \"68\": 'D', \"69\": 'E', \"70\": 'F', \"71\": 'G',\r\n    \"72\": 'H', \"73\": 'I', \"74\": 'J', \"75\": 'K', \"76\": 'L', \"77\": 'M', \"78\": 'N', \"79\": 'O',\r\n    \"80\": 'P', \"81\": 'Q', \"82\": 'R', \"83\": 'S', \"84\": 'T', \"85\": 'U', \"86\": 'V', \"87\": 'W',\r\n    \"88\": 'X', \"89\": 'Y', \"90\": 'Z', \"186\": ':', \"188\": '<', \"190\": '>', \"219\": '{', \"221\": '}',\r\n    \"191\": '?', \"192\": '~', '32': \" \", \"49\": '!', \"50\": '@', \"51\": '#', \"52\": '$',\r\n    \"53\": '%', \"54\": '^', \"55\": '&', \"56\": '*', \"57\": '(', \"48\": ')', \"189\": '_', \"187\": '+', \"13\": '\\n', \"220\": '|'\r\n}\r\n\r\nlet arrEn = {\r\n    \"65\": 'a', \"66\": 'b', \"67\": 'c', \"68\": 'd', \"69\": 'e', \"70\": 'f', \"71\": 'g',\r\n    \"72\": 'h', \"73\": 'i', \"74\": 'j', \"75\": 'k', \"76\": 'l', \"77\": 'm', \"78\": 'n', \"79\": 'o',\r\n    \"80\": 'p', \"81\": 'q', \"82\": 'r', \"83\": 's', \"84\": 't', \"85\": 'u', \"86\": 'v', \"87\": 'w',\r\n    \"88\": 'x', \"89\": 'y', \"90\": 'z', \"186\": ';', \"188\": ',', \"190\": '.', \"219\": '[', \"221\": ']',\r\n    \"222\": '\\'', \"191\": '/', \"192\": '`', '32': \" \", \"49\": '1', \"50\": '2', \"51\": '3', \"52\": '4',\r\n    \"53\": '5', \"54\": '6', \"55\": '7', \"56\": '8', \"57\": '9', \"48\": '0', \"189\": '-', \"187\": '=', \"13\": '\\n', \"220\": '\\\\'\r\n}\r\n\r\n// to fill the buttuns\r\nfunction buttonTxt() {\r\n    number.forEach(function (num) {\r\n        let ButtonText\r\n        if (Shift === false && Caps === false) {\r\n            ButtonText = arrEn[num.attributes[0].value]\r\n        } else if (Shift === true && Caps === true) {\r\n            ButtonText = arrEnShift[num.attributes[0].value].toLowerCase()\r\n        } else if (Shift === true && Caps === false) {\r\n            ButtonText = arrEnShift[num.attributes[0].value]\r\n        } else if (Shift === false && Caps === true) {\r\n            ButtonText = arrEn[num.attributes[0].value].toUpperCase()\r\n        }\r\n        num.innerHTML = ButtonText\r\n        document.querySelector(\".space__btn\").innerHTML = \"Space\"\r\n        document.querySelector(\".top__btn\").innerHTML = \"Back\"\r\n        return num.innerHTML\r\n    })\r\n}\r\nbuttonTxt()\r\n//Add eventhandler to buttons\r\nnumber.forEach(function (num) {\r\n    num.addEventListener('click', function (arg) {\r\n        clearProp();\r\n        let letterNum = arg.target.attributes[0].value;\r\n        numberFunc(letterNum);\r\n\r\n    });\r\n});\r\nlet numberFunc = (number) => {\r\n    _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.focus()\r\n    let tempLetter;\r\n    if (Shift === true) {\r\n        for (let key in arrEnShift) {\r\n            if (number === key) {\r\n                tempLetter = arrEnShift[key];\r\n                CurrentLetter = tempLetter;\r\n            }\r\n        }\r\n    } else if (Shift === false) {\r\n        for (let key in arrEn) {\r\n            if (number === key) {\r\n                tempLetter = arrEn[key];\r\n                CurrentLetter = tempLetter;\r\n            }\r\n        }\r\n    }\r\n\r\n    curString()\r\n}\r\n\r\n// Sharing event with the screen\r\nfunction curString() {\r\n    let tempLetter = CurrentLetter;\r\n    if (Caps === true && Shift === false) {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value += tempLetter.toUpperCase();\r\n    }\r\n    else if (Caps === true && Shift === true) {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value += tempLetter.toLowerCase();\r\n    } else if (Shift === true && Caps === false) {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value += tempLetter.toUpperCase();\r\n    }\r\n    else if (Caps === false && Shift === false) {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value += tempLetter;\r\n    }\r\n    (0,_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchCountry)(_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value)\r\n}\r\n\r\n\r\n\r\nfunction clearProp() {\r\n    number.forEach(number => number.classList.remove('key-press'))\r\n}\r\n\r\n// CapsLock\r\nfunction capsFunc() {\r\n    _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.focus()\r\n    if (Caps === false) {\r\n        Caps = true;\r\n        buttonTxt()\r\n        document.querySelector(\".caps\").style.border = \"3px solid #FE8E25\";\r\n    } else if (Caps === true) {\r\n        Caps = false;\r\n        buttonTxt()\r\n        document.querySelector(\".caps\").style.border = \"1px solid #388663\";\r\n    }\r\n    return Caps\r\n}\r\n//Shift\r\nfunction shiftFunc() {\r\n    buttonTxt()\r\n    _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.focus()\r\n    if (Shift === false) {\r\n        document.querySelector(\".shift__btn\").style.border = \"3px solid #FE8E25\";\r\n        Shift = true;\r\n        buttonTxt()\r\n    } else if (Shift === true) {\r\n        document.querySelector(\".shift__btn\").style.border = \"1px solid #388663\";\r\n        Shift = false;\r\n        buttonTxt()\r\n    }\r\n}\r\n// BackSpasce\r\nfunction backSp() {\r\n    _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.focus()\r\n    if (_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.textLength === _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.selectionEnd) {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value = _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value.slice(0, _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.selectionEnd - 1)\r\n    } else {\r\n        _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value = _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value.slice(0, _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.selectionEnd - 1) + _cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value.slice(_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.selectionEnd);\r\n    }\r\n    (0,_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchCountry)(_cases_table_js__WEBPACK_IMPORTED_MODULE_0__.searchInput.value)\r\n}\r\nBackSpace.addEventListener('click', backSp);\r\nshift__btn.addEventListener('click', shiftFunc);\r\ncaps.addEventListener('click', capsFunc);\r\n\n\n//# sourceURL=webpack:///./scripts/keyboard.js?");

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
/******/ 	__webpack_require__("./scripts/keyboard.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
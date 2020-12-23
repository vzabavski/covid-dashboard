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

/***/ "./scripts/table.js":
/*!**************************!*\
  !*** ./scripts/table.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nlet tableMode = document.querySelector('.table_mode');\r\nlet switchModeLeft = document.querySelector('.mode_switch_left');\r\nlet switchModeRight = document.querySelector('.mode_switch_right');\r\nlet countryMode = \"World\"\r\n\r\nlet country = document.querySelector('.country')\r\nlet cases = document.querySelector('.cases')\r\nlet deaths = document.querySelector('.deaths')\r\nlet recovered = document.querySelector('.recovered')\r\n\r\n\r\nlet modes = ['Total', 'Today', 'Total per 100.000 population', 'Today per 100.000 population'];\r\n\r\nlet currMode = tableMode.innerHTML;\r\nlet currStat;\r\n\r\nswitchModeLeft.addEventListener(\"click\", switchLeft);\r\n\r\nswitchModeRight.addEventListener(\"click\", switchRight);\r\n\r\n\r\nfunction switchLeft() {\r\n    if (modes.indexOf(currMode) === 0) {\r\n        tableMode.innerHTML = modes[3]\r\n        currMode = tableMode.innerHTML;\r\n        createCountryRow(currStat);\r\n    } else {\r\n        tableMode.innerHTML = modes[modes.indexOf(currMode) - 1];\r\n        currMode = tableMode.innerHTML;\r\n        createCountryRow(currStat);\r\n    }\r\n}\r\n\r\nfunction switchRight() {\r\n    if (modes.indexOf(currMode) === 3) {\r\n        tableMode.innerHTML = modes[0];\r\n        currMode = tableMode.innerHTML;\r\n        createCountryRow(currStat);\r\n    } else {\r\n        tableMode.innerHTML = modes[modes.indexOf(currMode) + 1];\r\n        currMode = tableMode.innerHTML;\r\n        createCountryRow(currStat);\r\n    }\r\n}\r\n\r\nfunction createCountryRow(stat) {\r\n    if (currMode === 'Total') {\r\n        country.innerHTML = stat.country;\r\n        cases.innerHTML = stat.cases;\r\n        deaths.innerHTML = stat.deaths;\r\n        recovered.innerHTML = stat.recovered;\r\n        currStat = stat;\r\n    } else if (currMode === 'Today') {\r\n        country.innerHTML = stat.country;\r\n        cases.innerHTML = stat.todayCases;\r\n        deaths.innerHTML = stat.todayDeaths;\r\n        recovered.innerHTML = stat.todayRecovered;\r\n       currStat = stat;\r\n    } else if (currMode === 'Total per 100.000 population') {\r\n        country.innerHTML = stat.country;\r\n        cases.innerHTML = Math.round((stat.cases / stat.population) * 100000);\r\n        deaths.innerHTML = Math.round((stat.deaths / stat.population) * 100000);\r\n        recovered.innerHTML = Math.round((stat.recovered / stat.population) * 100000);\r\n        currStat = stat;\r\n    } else if (currMode === 'Today per 100.000 population') {\r\n        country.innerHTML = stat.country;\r\n        cases.innerHTML = Math.round((stat.todayCases / stat.population) * 100000);\r\n        deaths.innerHTML = Math.round((stat.todayDeaths / stat.population) * 100000);\r\n        recovered.innerHTML = Math.round((stat.todayRecovered / stat.population) * 100000);\r\n        currStat = stat;\r\n    }\r\n}\r\n\r\nasync function getInf(url = 'https://disease.sh/v3/covid-19/countries', url1 = 'https://corona.lmao.ninja/v2/countries', country) {\r\n\r\n    let ctr = ''\r\n    country && country !== 'World' ? ctr = country : false\r\n    ctr ? countryMode = ctr : false\r\n\r\n    const response = await fetch(url)\r\n    const response1 = await fetch(url1)\r\n    const data = await response.json()\r\n    const data1 = await response1.json()\r\n    let covidData = [...data]\r\n    let PopulationData = [...data1]\r\n    let totalCases = 0;\r\n    let totalDeaths = 0;\r\n    let totalRecovered = 0;\r\n    let totalTodayCases = 0;\r\n    let totalTodayDeaths = 0;\r\n    let totalTodayRecovered = 0;\r\n    let totalPopulation = 0;\r\n\r\n    covidData.map((a) => {\r\n        totalDeaths += a.deaths;\r\n        totalRecovered += a.recovered;\r\n        totalCases += a.cases;\r\n        totalTodayDeaths += a.todayDeaths;\r\n        totalTodayRecovered += a.todayRecovered;\r\n        totalTodayCases += a.todayCases;\r\n        totalPopulation += a.population;\r\n    });\r\n\r\n    let totalObj = {\r\n        country: 'World',\r\n        cases: totalCases,\r\n        deaths: totalDeaths,\r\n        recovered: totalRecovered,\r\n        todayDeaths: totalTodayDeaths,\r\n        todayRecovered: totalTodayRecovered,\r\n        todayCases: totalTodayCases,\r\n        population: totalPopulation\r\n    }\r\n\r\n    for (let i = 0; i < covidData.length; i++) {\r\n        for (let j = 0; j < PopulationData.length; j++) {\r\n            if (covidData[i].country.toLowerCase() === PopulationData[j].country.toLowerCase()) {\r\n                covidData[i].population = PopulationData[j].population\r\n            }\r\n        }\r\n    }\r\n\r\n    if (!country && countryMode === 'World' || country === 'World') {\r\n        createCountryRow(totalObj);\r\n    } else {\r\n        for (let i = 0; i < covidData.length; i++) {\r\n            if (countryMode === covidData[i].country) {\r\n                createCountryRow(covidData[i]);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\ngetInf();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getInf);\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/table.js?");

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
/******/ 	__webpack_require__("./scripts/table.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
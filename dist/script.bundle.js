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

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/style.css?");

/***/ }),

/***/ "./scripts/script.js":
/*!***************************!*\
  !*** ./scripts/script.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.css */ \"./styles/style.css\");\n\r\n\r\nconst fullscreenBtns = document.querySelectorAll(\".btn-fullscreen\");\r\n\r\nfullscreenBtns.forEach((btn) => {\r\n\tbtn.addEventListener('click', function () {\r\n\t\tthis.parentNode.classList.toggle(\"open\");\r\n\t})\r\n})\r\n\r\nconst selectSingle = document.querySelector('.select');\r\nconst selectSingle_title = selectSingle.querySelector('.select__title');\r\nconst selectSingle_labels = selectSingle.querySelectorAll('.select__label');\r\n\r\nselectSingle_title.addEventListener('click', () => {\r\n  if ('active' === selectSingle.getAttribute('data-state')) {\r\n    selectSingle.setAttribute('data-state', '');\r\n  } else {\r\n    selectSingle.setAttribute('data-state', 'active');\r\n  }\r\n});\r\n\r\nfor (let i = 0; i < selectSingle_labels.length; i++) {\r\n  selectSingle_labels[i].addEventListener('click', (evt) => {\r\n    selectSingle_title.textContent = evt.target.textContent;\r\n    selectSingle.setAttribute('data-state', '');\r\n  });\r\n}\r\n\r\nconst btnBurgerLeft = document.querySelector('.burger__btn_left');\r\nconst leftColumn = document.querySelector('.main__left-column');\r\nbtnBurgerLeft.addEventListener('click', function () {\r\n\tbtnBurgerLeft.classList.toggle(\"active\");\r\n\tleftColumn.classList.toggle(\"active\");\r\n})\r\n\r\nconst btnBurgerRight = document.querySelector('.burger__btn_right');\r\nconst rightColumn = document.querySelector('.main__right-column');\r\nbtnBurgerRight.addEventListener('click', function () {\r\n\tbtnBurgerRight.classList.toggle(\"active\");\r\n\trightColumn.classList.toggle(\"active\");\r\n})\r\n\n\n//# sourceURL=webpack:///./scripts/script.js?");

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
/******/ 	__webpack_require__("./scripts/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
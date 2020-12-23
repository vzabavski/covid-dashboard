/******/ (() => { // webpackBootstrap
/******/ 	"use strict";


const fullscreenBtns = document.querySelectorAll(".btn-fullscreen");

fullscreenBtns.forEach((btn) => {
	btn.addEventListener('click', function () {
		this.parentNode.classList.toggle("open");
	})
})

const selectSingle = document.querySelector('.select');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');

selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

const btnBurgerLeft = document.querySelector('.burger__btn_left');
const leftColumn = document.querySelector('.main__left-column');
btnBurgerLeft.addEventListener('click', function () {
	btnBurgerLeft.classList.toggle("active");
	leftColumn.classList.toggle("active");
})

const btnBurgerRight = document.querySelector('.burger__btn_right');
const rightColumn = document.querySelector('.main__right-column');
btnBurgerRight.addEventListener('click', function () {
	btnBurgerRight.classList.toggle("active");
	rightColumn.classList.toggle("active");
})

/******/ })()
;
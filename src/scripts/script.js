const fullscreenBtns = document.querySelectorAll(".btn-fullscreen");
const fullscreens = document.querySelectorAll(".fullscreen");

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

var mapOptions = {
   center: [17.385044, 78.486671],
   zoom: 10
}
var map = new L.map('map', mapOptions);
var layer = new L.TileLayer('http://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png');
map.addLayer(layer);
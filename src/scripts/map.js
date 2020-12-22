import '../styles/map.css'
import json from './countries.json'
import {countryPointToLayer, resetHighlight, highlightCountry, zoomToCountry, onEachCountry} from './map.auxilarity'

let map = L.map('map').setView([30.505, -0.09], 2);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1.5,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        crossOrigin: true
      }).addTo(map);



    fetch(`https://corona.lmao.ninja/v3/covid-19/countries`)
    .then(response => response.json())
    .then(info => {
        const geojsonFeature = {
            type: 'FeatureCollection',
            features: info.map((country) => {
                return {
                    type: 'Feature',
                    properties: country,
                    geometry: {
                        type: 'Point',
                        coordinates: [country.countryInfo.long, country.countryInfo.lat]
                    }
                }
            })
        }; 
        const geoJsonLayers = new L.geoJSON(geojsonFeature, {
            pointToLayer: countryPointToLayer
        })
        geoJsonLayers.addTo(map)
        return info;
    })
    .then((stats) => {
        function style() {
            return {
                fillColor: 'rgba(217, 38, 38, 0.63)',
                weight: 2,
                opacity: 1,
                color: '#391212',
                dashArray: '3',
                fillOpacity: 0.7
            };
        };
        const info = L.control();

        info.onAdd = function () {
            this._div = L.DomUtil.create('div', 'info'); 
           this.update();
            return this._div;
        };
        info.update = function (countryName, cases, recovered, deaths) {
            this._div.innerHTML =  (countryName ? `<h4>${countryName}</h4> <p>Cases: ${cases}</p><p>Recovered: ${recovered}</p><p>Deaths: ${deaths}</p>` : 'Hover over a country');
        };
        info.addTo(map);

        

        const countriesBorders = new L.geoJSON(json, {
            style: style,
            onEachFeature: onEachCountry
        });
        countriesBorders.addTo(map);
    })
    .catch((e) => {
        console.error(e)
    })

const legend = L.control({position: 'bottomright'});

legend.onAdd = () => {

    const div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1000, 5000, 10000, 100000, 500000, 1000000],
        colors = ['rgb(255, 198, 42)', 'rgb(252, 151, 20)', 'rgb(255, 60, 0)', 'rgb(204, 52, 6)', ' rgb(133, 33, 2)', 'rgb(87, 14, 1)', 'rgb(46, 7, 0)'];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += `<div class="legend-row"><i style="background:${colors[i]}"></i> <p>${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] : '+'}</p></div>`;
    }

    return div;
};

legend.addTo(map);


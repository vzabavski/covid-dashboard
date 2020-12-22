import '../styles/map.css'
import json from './countries.json'
import {initChart} from './chart'

let map = L.map('map').setView([30.505, -0.09], 2);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1.5,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        crossOrigin: true
      }).addTo(map);

function countryPointToLayer(feature, latlng) {
    let casesString = String(feature.properties.cases);
    let setSize;

    if(feature.properties.cases > 1000) {
        casesString = casesString.slice(0, casesString.length - 3) + 'k';
    }

    if (feature.properties.cases < 1000) {
        setSize = 'marker-extralight';
    } else if (feature.properties.cases > 1000 && feature.properties.cases < 5000) {
        setSize = 'marker-light';
    } else if (feature.properties.cases > 5000 && feature.properties.cases < 10000) {
        setSize = 'marker-medium';
    } else if (feature.properties.cases > 10000 && feature.properties.cases < 100000) {
        setSize = 'marker-dark';
    } else if (feature.properties.cases > 100000 && feature.properties.cases < 500000) {
        setSize = 'marker-darker';
    } else if (feature.properties.cases > 500000 && feature.properties.cases < 1000000) {
        setSize = 'marker-extradark';
    } else {
        setSize = 'marker-ultradark';
    }

    const html = 
    `<span class='marker ${setSize}'>
        <span>${casesString}</span>
     </span>`;
     return L.marker(latlng, {
         icon: L.divIcon({
             className: 'icon',
             html
         }),
         riseOnHover: true
     });
}

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

        function resetHighlight(e) {
            countriesBorders.resetStyle(e.target);
            info.update();
        };
        function highlightCountry(e) {
            var layer = e.target;
            layer.setStyle({
                weight: 3,
                color: '#2A0303',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
            for (let c of stats) {
                if (layer.feature.properties.ADMIN === c.country || layer.feature.properties.ISO_A3 === c.country) {
                    info.update(c.country, c.cases, c.recovered, c.deaths);
                }
            }
            
        };
        function zoomToCountry(e) {
            let countryName = e.target.feature.properties.ADMIN;
            map.fitBounds(e.target.getBounds());
            initChart(countryName)
        };

        function onEachCountry(_, layer) {
            layer.on({
                mouseover: highlightCountry,
                mouseout: resetHighlight,
                click: zoomToCountry
            });
        };

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

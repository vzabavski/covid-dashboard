let map = L.map('map').setView([41.505, -0.09], 2);
L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ndaPzoGC0TwGF7KGWreC',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1.5,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
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
    })
    
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
    `<span class='info ${setSize}'>
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
const legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    const div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1000, 5000, 10000, 100000, 500000, 1000000],
        colors = ['rgb(255, 198, 42)', 'rgb(252, 151, 20)', 'rgb(255, 60, 0)', 'rgb(204, 52, 6)', ' rgb(133, 33, 2)', 'rgb(87, 14, 1)', 'rgb(46, 7, 0)'];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += `<div class="legend-row"><i style="background:${colors[i]}"></i> <p>${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] : '+'}</p></div>`;
    }

    return div;
};

legend.addTo(map);


const fs = require('fs');

let rawdata = fs.readFileSync('counties.json');
let student = JSON.parse(rawdata);
console.log(student);
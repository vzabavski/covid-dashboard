import {initChart} from './chart'
import {getInf} from './table'

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
    getInf('https://disease.sh/v3/covid-19/countries', 'https://corona.lmao.ninja/v2/countries', countryName)
};

function onEachCountry(_, layer) {
    layer.on({
        mouseover: highlightCountry,
        mouseout: resetHighlight,
        click: zoomToCountry
    });
};

export {countryPointToLayer, resetHighlight, highlightCountry, zoomToCountry, onEachCountry}
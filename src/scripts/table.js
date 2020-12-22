let tableEntity = document.querySelector('.table_entity');

let tableMode = document.querySelector('.table_mode');
let switchModeLeft = document.querySelector('.mode_switch_left');
let switchModeRight = document.querySelector('.mode_switch_right');

let country = document.querySelector('.country')
let cases = document.querySelector('.cases')
let deaths = document.querySelector('.deaths')
let recovered = document.querySelector('.recovered')

let modes = ['Total', 'Of the last day', 'Total per 100 thousand population', 'Based on 100 thousand population of the last day'];
let currMode = tableMode.innerHTML;
let currStat;

switchModeLeft.addEventListener("click", switchLeft);

switchModeRight.addEventListener("click", switchRight);

function switchLeft() {
    if (modes.indexOf(currMode) === 0) {
        tableMode.innerHTML = modes[3];
        currMode = tableMode.innerHTML;
        createCountryRow(currStat);
    } else {
        tableMode.innerHTML = modes[modes.indexOf(currMode) - 1];
        currMode = tableMode.innerHTML;
        createCountryRow(currStat);
    }
}

function switchRight() {
    if (modes.indexOf(currMode) === 3) {
        tableMode.innerHTML = modes[0];
        currMode = tableMode.innerHTML;
        createCountryRow(currStat);
    } else {
        tableMode.innerHTML = modes[modes.indexOf(currMode) + 1];
        currMode = tableMode.innerHTML;
        createCountryRow(currStat);
    }
}


function createCountryRow(stat) {
    if (currMode === 'Total') {
        country.innerHTML = stat.country;
        cases.innerHTML = stat.cases;
        deaths.innerHTML = stat.deaths;
        recovered.innerHTML = stat.recovered;

        currStat = stat;

    } else if (currMode === 'Of the last day') {
        country.innerHTML = stat.country;
        cases.innerHTML = stat.todayCases;
        deaths.innerHTML = stat.todayDeaths;
        recovered.innerHTML = stat.todayRecovered;

        currStat = stat;
    } else if (currMode === 'Total per 100 thousand population') {
        country.innerHTML = stat.country;
        cases.innerHTML = Math.round((stat.cases / stat.population) * 100000);
        deaths.innerHTML = Math.round((stat.deaths / stat.population) * 100000);
        recovered.innerHTML = Math.round((stat.recovered / stat.population) * 100000);

        currStat = stat;
    } else if (currMode === 'Based on 100 thousand population of the last day') {
        country.innerHTML = stat.country;
        cases.innerHTML = Math.round((stat.todayCases / stat.population) * 100000);
        deaths.innerHTML = Math.round((stat.todayDeaths / stat.population) * 100000);
        recovered.innerHTML = Math.round((stat.todayRecovered / stat.population) * 100000);

        currStat = stat;
    }
}

async function getInf(url = 'https://disease.sh/v3/covid-19/countries', url1 = 'https://corona.lmao.ninja/v2/countries', country) {
    const response = await fetch(url)
    const response1 = await fetch(url1)
    const data = await response.json()
    const data1 = await response1.json()
    let covidData = [...data]
    let PopulationData = [...data1]
    let totalCases = 0;
    let totalDeaths = 0;
    let totalRecovered = 0;
    let totalTodayCases = 0;
    let totalTodayDeaths = 0;
    let totalTodayRecovered = 0;
    let totalPopulation = 0;

    covidData.map((a) => {
        totalDeaths += a.deaths;
        totalRecovered += a.recovered;
        totalCases += a.cases;
        totalTodayDeaths += a.todayDeaths;
        totalTodayRecovered += a.todayRecovered;
        totalTodayCases += a.todayCases;
        totalPopulation += a.population;
    });

    let totalObj = {
        country: 'World',
        cases: totalCases,
        deaths: totalDeaths,
        recovered: totalRecovered,
        todayDeaths: totalTodayDeaths,
        todayRecovered: totalTodayRecovered,
        todayCases: totalTodayCases,
        population: totalPopulation
    }

    for (let i = 0; i < covidData.length; i++) {
        for (let j = 0; j < PopulationData.length; j++) {
            if (covidData[i].country.toLowerCase() === PopulationData[j].country.toLowerCase()) {
                covidData[i].population = PopulationData[j].population
            }
        }
    }
    if (!country) {
        createCountryRow(totalObj);
    } else {
        for(let i = 0; i< covidData.length; i++) {
            if(country === covidData[i].country) {
                createCountryRow(covidData[i]);
            }
        }
    }
}

getInf();

export { getInf }
/* eslint-disable no-undef */
import '../styles/chart.css'
import {getInfo} from './stats.data.js'
var Chart = require('chart.js');
console.log(Chart, typeof Chart)
const chart = document.getElementById('myChart');

export function initChart(country = 'world', mode='total') {
    if (country !== 'world') {
        getInfo(country, mode)
        .then((data) => {
            let [cases, date] = createCasesArray(data.allData, true)
            drawChart(cases, date, country)
        })
        chart.dataset.value = country
    } else {
        chart.dataset.value = 'world'
        try {
            fetch('https://covid19-api.org/api/timeline')
            .then(response => response.json())
            .then((info) => {
                let [cases, date] = createCasesArray(info)
                drawChart(cases.reverse(), date.reverse(), 'World')
            })
        } catch(e) {
            throw Error(e)
        }
    }
}

function drawChart(cases, date, countryName) {
       let myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: `${countryName}`,
                data: cases,
                backgroundColor: createChartPoint(cases.length, 'rgba(255, 99, 132, 0.2)'),
                borderColor: createChartPoint(cases.length, 'rgba(255, 99, 132, 1)'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return myChart
}

function createChartPoint(times, color) {
    return Array(times).fill(color)
}
    

function createCasesArray(statArray, mode) {
    const confirmed = [];
    const date = [];
    for (let c of statArray) {
        if(mode) {
            confirmed.push(c['Confirmed'])
            date.push(c['Date'].slice(0, 10))
        } else {
            confirmed.push(c['total_cases'])
            date.push(c['last_update'].slice(0, 10))
        }
    }
    return [confirmed, date];
}
const btn1 = document.getElementById('save_mode');
btn1.addEventListener('click', () => saveSettings('mode'))
function saveSettings(mode) {
    const [...settings] = document.getElementsByName(mode)
    let checkedSetting = settings.filter(btn => btn.checked)[0]
    initChart(chart.dataset.value, checkedSetting.value)
}

initChart()

export default initChart
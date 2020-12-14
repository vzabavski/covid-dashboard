import {CountryData} from './countries.data.js'
CountryData.fetching()
setTimeout(() => console.log(CountryData.countries[5]['name']), 4000)

import {StatsData} from './stats.data.js'
StatsData.getInfo('Belarus', 'total by country')
setTimeout(() => console.log(StatsData.countryTotalConfirmed), 3000)
import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '5e55399dda0c1892656c47864b7b4ea5'


export const fetchWeather = async(query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'imperial',
            APPID: API_KEY
        }
    })

    return data
}
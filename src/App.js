import { useState } from 'react';
import Searchbar from './components/searchbar';
import { requestCurrentWeather, requestCoordinates, requestFiveDaysForecast } from './API/API';
import CurrentWeatherDisplay from './components/currentWeatherDisplay';
import styles from './App.module.css'
import './utils/normalize.css'
import FiveDaysForecastDisplay from './components/fiveDaysForecastDisplay';

function App() {
  const [checkbox, setCheckbox] = useState("current")
  const [data, setData] = useState([])

  // Getting current weather data, picking required data info and setting it in a data state.
  function getCurrentWeather(latitude, longitude) {
    requestCurrentWeather(latitude, longitude)
      .then(res => {
        let weatherData = {
          id: "currentWeather",
          city: res.name,
          temp: Math.round(res.main.temp),
          feelsLike: Math.round(res.main.feels_like),
          humidity: res.main.humidity,
          pressure: res.main.pressure,
          weather: res.weather[0].description
        }
        setData(weatherData);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Getting a 5 days forecast data, picking required data info and setting it in a data state in a format we need to work with later.
  function getFiveDaysForecast(latitude, longitude) {
    requestFiveDaysForecast(latitude, longitude)
      .then(res => {
        const weatherData = {
          city: res.city.name,
          id: "fiveDaysForecast"
        };
        const array = [];
        let dayinfo = {};
        for (let i = 0; i < res.list.length; i++) {
          let currentDate = res.list[i].dt_txt.slice(0, 10);
          if (dayinfo.date !== currentDate) {
            if (dayinfo.date) {
              array.push(dayinfo);
              dayinfo = {};
            }
            dayinfo.date = currentDate;
            dayinfo.hourlyData = [];
          }
          dayinfo.hourlyData.push({
            temp: Math.round(res.list[i].main.temp),
            time: res.list[i].dt_txt.slice(11, 16),
            pressure: res.list[i].main.pressure,
            humidity: res.list[i].main.humidity,
            weather: res.list[i].weather[0].description
          })
        }
        weatherData.array = array;
        array.push(dayinfo);

        setData(weatherData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Acquire geo coordinates of current user`s position
  function getWeatherInCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (checkbox === "current") {
          getCurrentWeather(latitude, longitude)
        } else if (checkbox === "fiveDays") {
          getFiveDaysForecast(latitude, longitude)
        }
      })

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.searchbarContainer}>
          <Searchbar getWeatherInCurrentPosition={getWeatherInCurrentPosition} getCoordinates={requestCoordinates} getCurrentWeather={getCurrentWeather} getFiveDaysForecast={getFiveDaysForecast} checkbox={checkbox} setCheckbox={setCheckbox} />
        </section>
        <section className={styles.displayContainer}>
          {data.id === "currentWeather" ? (
            <CurrentWeatherDisplay data={data} />
          ) : data.id === "fiveDaysForecast" ? (
            <FiveDaysForecastDisplay data={data} />
          ) : (
            <div className={styles.noDataInfo}>No weather data yet</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

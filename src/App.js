import { useEffect, useState } from 'react';
import './App.css';
import Searchbar from './components/searchbar';
import { requestCurrentWeather, requestCoordinates, requestFiveDaysForecast } from './API/API';


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
          weather: res.weather[0].main
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
        console.log(res);
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
            time: res.list[i].dt_txt.slice(11, 16)
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

  useEffect(() => {
    console.log("Data changed to: ", data)
  }, [data])

  return (
    <div className="App">
      <main>
        <Searchbar getWeatherInCurrentPosition={getWeatherInCurrentPosition} getCoordinates={requestCoordinates} getCurrentWeather={getCurrentWeather} getFiveDaysForecast={getFiveDaysForecast} checkbox={checkbox} setCheckbox={setCheckbox} />
        <section>
          {data.id === "currentWeather" ? (
            <div>
              Weather in {data.city} is {data.temp} &deg;C, and it is {data.weather}
            </div>
          ) : data.id === "fiveDaysForecast" ? (
            <div>
              <h1>The weather in the city of {data.city} is:</h1>
              {data.array.map((item, index) => (
                <div key={index}>
                  <h2>Date: {item.date}</h2>
                  {item.hourlyData.map((hourlyItem, hourlyIndex) => (
                    <div key={hourlyIndex}>
                      <p>Time: {hourlyItem.time}, Temperature: {hourlyItem.temp} &deg;C</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>No weather data yet</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

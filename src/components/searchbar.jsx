import { useState } from "react";
import styles from "./searchbar.module.css";

export default function Searchbar({
  getWeatherInCurrentPosition,
  getCoordinates,
  getCurrentWeather,
  getFiveDaysForecast,
  checkbox,
  setCheckbox,
}) {
  const [cityName, setCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cityInput = document.getElementById("cityName");

  function onSubmit(e) {
    e.preventDefault();
    let latitude;
    let longitude;
    setErrorMessage("");
    if (cityName.length > 0) {
      getCoordinates(cityName)
      .then((coordinates) => {
        if(coordinates.length > 0) {
        latitude = coordinates[0].lat;
        longitude = coordinates[0].lon;
      } else {
        setErrorMessage('Invalid city name or no city found')
      }
      })
      .then(() => {
        if (checkbox === "current") {
          getCurrentWeather(latitude, longitude);
        } else if (checkbox === "fiveDays") {
          getFiveDaysForecast(latitude, longitude);
        }
      })
      .finally(() => {
        cityInput.value = "";
        setCityName("");
      });
    } else {
      setErrorMessage("Please enter city name!")
    }

  }

  return (
    <section>
      <div>
        <div>
          <label className={styles.title} htmlFor="current">
            Current
          </label>
          <input
            type="radio"
            id="current"
            name="weather"
            onChange={() => setCheckbox("current")}
            checked={checkbox === "current" ? true : false}
          />
          <label htmlFor="fiveDays">Five days forecast</label>
          <input
            type="radio"
            id="fiveDays"
            name="weather"
            onChange={() => setCheckbox("fiveDays")}
            checked={checkbox === "fiveDays" ? true : false}
          />
        </div>
        <button type="button" onClick={getWeatherInCurrentPosition}>
          Show current location
        </button>
        <form action="submit" onSubmit={onSubmit}>
          <input
            type="text"
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
          />
          <button type="submit">Search</button>
          <span>{errorMessage}</span>
        </form>
      </div>
      <div></div>
    </section>
  );
}

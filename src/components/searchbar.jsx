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
      <div className={styles.container}>
        <div className={styles.optionsContainer}>
          <label className={styles.labelName} htmlFor="current">
            Current
          </label>
          <input
            type="radio"
            id="current"
            name="weather"
            onChange={() => setCheckbox("current")}
            checked={checkbox === "current" ? true : false}
          />
          <label className={styles.labelName} htmlFor="fiveDays">Five days forecast</label>
          <input
            type="radio"
            id="fiveDays"
            name="weather"
            onChange={() => setCheckbox("fiveDays")}
            checked={checkbox === "fiveDays" ? true : false}
          />
        </div>
        <button className={styles.currentlocationButton} type="button" onClick={getWeatherInCurrentPosition}>
          Show current location
        </button>
        <form className={styles.searchForm} action="submit" onSubmit={onSubmit}>
          <input
            className={styles.input}
            type="text"
            id="cityName"
            placeholder="Enter city name"
            onChange={(e) => setCityName(e.target.value)}
          />
          <button className={styles.searchButton} type="submit">Search</button>
          <span className={styles.errorMessage}>{errorMessage}</span>
        </form>
      </div>
  );
}

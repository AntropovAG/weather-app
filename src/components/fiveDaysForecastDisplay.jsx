import styles from "./fiveDaysForecastDisplay.module.css";

export default function FiveDaysForecastDisplay({ data }) {
  const { city, array } = data;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  return (
    <>
      <h2 className={styles.cityName}>{city}</h2>
      <div className={styles.container}>
        {array.map((item, index) => (
          <>
            <h3 className={styles.date}>{formatDate(item.date)}</h3>
            <div key={index} className={styles.dateContainer}>
              {item.hourlyData.map((hourlyItem, hourlyIndex) => (
                <div key={hourlyIndex} className={styles.itemContainer}>
                  <h3 className={styles.hour}>{hourlyItem.time}</h3>
                  <p className={styles.temperature}>{hourlyItem.temp}&deg;C</p>
                  <p className={styles.weather}>{hourlyItem.weather}</p>
                  <p className={styles.info}>Humidity: {hourlyItem.humidity}%</p>
                  <p className={styles.info}>Pressure: {hourlyItem.pressure}</p>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

import styles from './currentWeatherDisplay.module.css'

export default function CurrentWeatherDisplay({ data }) {
    const { city, temp, weather, feelsLike, humidity, pressure } = data;

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.name}>{city}</h2>
                <p className={styles.temperature}>{temp}&deg;C</p>
                <p className={styles.weather}>{weather}</p>
                <p className={styles.info}>Feels like {feelsLike}&deg;C</p>
                <p className={styles.info}>Humidity: {humidity}%</p>
                <p className={styles.info}>Pressure: {pressure}</p>
            </div>
        </>
    );
}

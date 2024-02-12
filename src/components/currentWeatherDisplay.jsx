export default function CurrentWeatherDisplay({data}) {
    console.log(data)
    const {city, temp, weather} = data

    return (
    <>
        <h2>Weather in {city} is {temp} and it is {weather} </h2>
    </>
    )
}
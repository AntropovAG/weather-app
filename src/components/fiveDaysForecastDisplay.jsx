export default function FiveDaysForecastDisplay({data}) {
    console.log(data)
    const {city, array} = data

    return (
        <div>
        <h1>The weather in the city of {city} is:</h1>
        {array.map((item, index) => (
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
    )
}
const KEY = '574039ed0afabc685b96a448f526c698';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((res) => Promise.reject(res.message));
};


export function requestCurrentWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`, {
        method: "GET",
    }).then(checkResponse);
}

export function requestFiveDaysForecast(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`, {
        method: "GET",
    }).then(checkResponse);
}

// export function requestCoordinates(name) {
//     return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${KEY}`, {
//         method: "GET"
//     }).then(checkResponse);
// }


export function requestCoordinates(name) {
    return fetch(`https://geocode.maps.co/search?q=${name}&api_key=65d300e5d9f7d803515865rzw804905`, {
        method: "GET"
    }).then(checkResponse);
}



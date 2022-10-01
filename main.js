const result = document.querySelector('.result');
const form = document.querySelector('.get__weather');
const nameCity = document.querySelector('#city');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nameCity.value);
})

function callAPI(city){
    const apiId = '0dfc326a1b3063068c1eb1a0289a9a16';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},Colombia&appid=${apiId}`;

    fetch(url)
        .then(data => {
            console.log(url);
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
           
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, wind:{speed}, main:{temp, temp_min, temp_max, humidity}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const viento = speed;
    const humedad = humidity

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
        <p>Velocidad del viento: ${viento} km/h</p>
        <p>Humedad: ${humedad}%</p>
    `;

    result.appendChild(content);
}

function showError(message){

    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
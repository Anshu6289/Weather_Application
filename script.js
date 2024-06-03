document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    console.log('Input Location:', location); // Print input value to console for debugging
    
    getWeatherData(location);
  
    
});


document.addEventListener('DOMContentLoaded',function(){
    const addBtn = document.getElementById('add-btn');
    const formcontainer = document.getElementById('formContainer');
    const CityForm = document.getElementById('cityForm');


           addBtn.addEventListener('click', function(){
           formcontainer.style.display='flex';
           addBtn.style.display='none';
           });

           CityForm.addEventListener('submit',function(event) {
            event.preventDefault();
            const cityInput = document.getElementById('cityInput');
            const  cityName =cityInput.value.trim();
            if(cityName){
                fetchWeatherData(cityName);
                cityInput.value = '';
                formcontainer.style.display = 'none';
                addBtn.style.display = 'inline';
            }
           });

});
async function fetchWeatherData(city) {
    const apiKey = 'c3e9803ff7msh7d2ab75760aa63bp1ec8e1jsnd0345bd93d6d'; // Replace with your RapidAPI key
    const apiHost = 'open-weather13.p.rapidapi.com';

    const url =`https://${apiHost}/city/${city}/EN'`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Weather Data:', data); // Print fetched data to console for debugging
        addWeatherDataToTable(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getWeatherData(location) {
    const apiKey = 'c3e9803ff7msh7d2ab75760aa63bp1ec8e1jsnd0345bd93d6d'; // Replace with your RapidAPI key
    const apiHost = 'open-weather13.p.rapidapi.com';

    // Ensure the location is formatted correctly
   
    const url = `https://open-weather13.p.rapidapi.com/city/${location}/EN'`;

    console.log('Request URL:', url); // Print URL to console for debugging

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log('Response status:', response.status);
            console.log('Response status text:', response.statusText);
            throw new Error('Network response was not ok');
        }
       const data = await response.json();
        console.log('Weather Data:', data); // Print fetched data to console for debugging
        updateWeatherUI(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function addWeatherDataToTable(data){
    const weatherTablebody = document.querySelector('#weatherTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.main.temp} &deg;F</td>
    <td>${data.main.feels_like} &deg;F</td>
    <td>${data.main.humidity} %</td>
    <td>${data.wind.speed} km/h</td>
    <td>${data.main.pressure} hPa</td>
    <td>${data.visibility} meters</td>
    <td>${data.weather[0].description}</td>
    <td><button class="delete-btn">Delete</button></td>
`;

row.querySelector('.delete-btn').addEventListener('click',function(){
    row.remove();
})
weatherTablebody.appendChild(row);
}

function updateWeatherUI(data) {
    
    // Update city name
    const cityNameElement = document.getElementById('cityName');
    if (cityNameElement) {
        cityNameElement.innerHTML = data.name;
        
    }

    // Update temperature
    const temperatureElement = document.getElementById('temperature');
    if (temperatureElement) {
        temperatureElement.innerHTML = `${data.main.temp} °F`;
        
    }

    // Update feels like
    const feelsLikeElement = document.getElementById('feelsLike');
    if (feelsLikeElement) {
        feelsLikeElement.innerHTML= `${data.main.feels_like} °F`;
    }

    // Update humidity
    const humidityElement = document.getElementById('humidity');
    if (humidityElement) {
        humidityElement.innerHTML = `${data.main.humidity} %`;
    }

    // Update wind speed
    const windSpeedElement = document.getElementById('windSpeed');
    if (windSpeedElement) {
        windSpeedElement.innerHTML = `${data.wind.speed} km/h`;
    }

    // Update pressure
    const pressureElement = document.getElementById('pressure');
    if (pressureElement) {
        pressureElement.innerHTML = `${data.main.pressure} hPa`;
    }

    // Update visibility
    const visibilityElement = document.getElementById('visibility');
    if (visibilityElement) {
        visibilityElement.innerHTML  = `${data.visibility} meters`;
    }

    // Update weather description
    const weatherDescriptionElement = document.getElementById('weatherDescription');
    if (weatherDescriptionElement) {
        weatherDescriptionElement.innerHTML  = data.weather[0].description;
    }

    console.log('Temperature:', data.main.temp, '°F');
    console.log('Feels Like:', data.main.feels_like, '°F');
    console.log('Humidity:', data.main.humidity, '%');
    console.log('Wind Speed:', data.wind.speed, 'km/h');
    console.log('Pressure:', data.main.pressure, 'hPa');
    console.log('Visibility:', data.visibility, 'meters');
    console.log('Weather Description:', data.weather[0].description);
}
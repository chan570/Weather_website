const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temperature');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('search-button');
const suggestionsContainer = document.getElementById('suggestions');
const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 
    'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 
    'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 
    'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 
    'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 
    'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 
    'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 
    'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 
    'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 
    'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 
    'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
    'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 
    'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 
    'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 
    'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 
    'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = '197e855b8a822993466cf9d176bfa4c6';
const API_kEY = 'AIzaSyBbX_ghnN9d5UB2MPPJkdLWxoIxTfsOf2s';

// Event listener for input field to show suggestions
locationInput.addEventListener('input', () => {
    const query = locationInput.value.trim().toLowerCase();
    if (query.length > 0) {
        showSuggestions(countries.filter(country => country.toLowerCase().startsWith(query)));
    } else {
        suggestionsContainer.innerHTML = '';
    }
});

// Function to fetch suggestions
function fetchSuggestions(query) {
    fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            showSuggestions(data.list);
        })
}

// Function to display suggestions
function showSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(country => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = country;
            suggestionItem.addEventListener('click', () => {
                locationInput.value = country;
                suggestionsContainer.innerHTML = '';
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
}

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
    timeEl.innerHTML = (hoursIn12HrFormat <10 ? '0'+ hoursIn12HrFormat: hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month]
}, 1000)
getWeatherData()
function getWeatherData(latitude = null, longitude = null, city = null) {
    let apiUrl;
    if (city) {
        // If city name is provided, use it to fetch weather data
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    } else if (latitude && longitude) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            showWeatherData(data);
        })
}
function getTimeForCity(city) {
    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${city}&timestamp=${Math.floor(Date.now() / 1000)}&key=${API_kEY}`)
        .then(response => response.json())
        .then(data => {
            const { dstOffset, rawOffset, timeZoneId, timeZoneName } = data;
            const localTime = new Date((Date.now() + (dstOffset + rawOffset) * 1000)).toLocaleString('en-US', { timeZone: timeZoneId });
            displayTime(localTime, timeZoneName);
        })
       
}

function displayTime(time, timezone) {
    const timeElement = document.getElementById('current-time');
    timeElement.innerHTML = `Current time in ${timezone}: ${time}`;
}

function showWeatherData(data) {
    let { humidity, pressure } = data.list[0].main;
    let { sunrise, sunset } = data.city;
    let { speed } = data.list[0].wind;
    timezone.innerHTML = data.city.name;
    countryEl.innerHTML = data.city.country;
    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
    <div class = "item1"> <div><i class="fas fa-tint"></i><br> Humidity </div>
    <div>${humidity}</div>
</div>
</div>
<div class="weather-item" >
    <div class = "item2"><div><i class="fas fa-gauge"></i><br>
 Pressure </div>
    <div> ${pressure}</div>
</div>
</div>
<div class="weather-item" >
    <div class = "item3"><div> <i class="fas fa-wind"></i><br>
Wind Speed </div>
    <div> ${speed}</div>
</div>
</div>
<div class="weather-item" >
    <div class = "item4"><div> <i class="fas fa-sun"></i><br>

Sunrise </div>
    <div> ${window.moment(sunrise * 1000).format('h:mm a')}</div>
</div>
</div>
<div class="weather-item" >
    <div class = "item5"> <div><i class="fas fa-moon"></i><br>
Sunset </div>
    <div> ${window.moment(sunset * 1000).format('h:mm a')}</div>
</div>
</div>
`;
    let otherDayForcast = ''
    data.list.forEach((time, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
                 <img src=" https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png" alt="Weather-Icon" class="w-icon">
            <div class="others">
                <div class="day"> Now </div>
                <div class="temperature"> ${time.main.temp_max}&#176; C </div>
                <div class="temperature"> ${time.main.temp_min}&#176; C </div>
            </div> `
            
        } else if(idx<8) {
            otherDayForcast += `
              <div class="weather-forecast-item">
                <div class="day"> At  ${window.moment(time.dt* 1000).format('h:mm A')} </div>
              
                <img src=" https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png" alt="Weather-Icon" class="w-icon">

                <div class="temperature">${time.main.temp_max}&#176; C </div>
                <div class="temperature"> ${time.main.temp_min}&#176; C </div>
            </div>

        </div>
            `
        }
        else{}
    })
    weatherForecastEl.innerHTML = otherDayForcast;

}
function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        getWeatherData(latitude, longitude);
    });
}

// Function to search for weather data based on city name
function searchWeather() {
    const city = locationInput.value.trim();
    if (city) {
        getWeatherData(null, null, city);
        getTimeForCity(city); // Fetch and display time
    } else {
        alert('Please enter a location');
    }
}
 
// Initialize by fetching weather data for the current location
getCurrentLocationWeather();
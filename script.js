window.addEventListener('DOMContentLoaded', ()=>{
    const api = {
        key: '4187d1bac3569878c2c7227240c637ae',
        baseUrl: 'https://api.openweathermap.org/data/2.5/'
    }
    
    const searchBox = document.querySelector('.search');
    searchBox.addEventListener('keypress', setQuery);
    
    function setQuery(e) {
        if(e.keyCode == 13) {
            getResults(searchBox.value);
            searchBox.value = ''
        }
    }
    function getResults(query){
        fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults)
    }
    function displayResults(weather){
        console.log(weather);
        let city = document.querySelector('.city')
        city.innerHTML= `${weather.name}, ${weather.sys.country}`
    
        let now = new Date();
        let date = document.querySelector('.date')
        date.innerHTML = dateBuilder(now);
    
        let temp = document.querySelector('.temp');
        temp.innerHTML = ` ${Math.round(weather.main.temp)} <span>°C</span>`
    
        let weatherType = document.querySelector('.weather')
        weatherType.innerHTML = weather.weather[0].main;
    
        let highLow = document.querySelector('.high-low')
        if(weather.main.temp_min == weather.main.temp_max){
            highLow.innerHTML = `${weather.main.temp_min} <span>°C</span>`
        }else{
            highLow.innerHTML = `Min: ${Math.round((weather.main.temp_min)*100)/100} <span>°C</span> / Max: ${Math.round((weather.main.temp_max)*100)/100} <span>°C</span>`
        }
    }
    
    function dateBuilder(m){
        let months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let day = days[m.getDay()];
        let date = m.getDate();
        let month = months[m.getMonth()];
        let year = m.getFullYear();
    
        return `${day} | ${month} ${date} | ${year}`
    }
    
    
    
})
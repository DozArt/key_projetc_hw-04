import format_date from "./format_date";


function WeatherForecast(weather, timezone){
    return (
    <div>
        <div className='location-box'>
            <a href ="#1" className='date'>{format_date(new Date((weather.dt + timezone) * 1000))}</a>
        </div>
        <div className='weather-box'>
            <div className='temp'>
                {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
        </div>
    </div>
    );
}

export default WeatherForecast;
import format_date from "./format_date";
import './css/owfont-regular.css'


function WeatherForecast(weather, timezone){
    const imgURL = "owf owf-"+ weather.weather[0].id +" owf-5x icon-style"

    return (
    <div>
        <div className='location-box'>
            {format_date(new Date((weather.dt + timezone) * 1000))}
        </div>
        <div className='weather-box'>
            <div className='temp'>
                {Math.round(weather.main.temp)}°c
            </div>
            <i className={imgURL} title={weather.weather[0].main}></i>
        </div>
    </div>
    );
}

export default WeatherForecast;
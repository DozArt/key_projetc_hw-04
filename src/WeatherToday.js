import format_date from "./format_date";


function WeatherToday(weather){
    return (
        <div>
          <div className='location-box'>
            <div className='date'>{format_date(new Date((weather.dt + weather.timezone) * 1000))}</div>
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

export default WeatherToday;
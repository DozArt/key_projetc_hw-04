
function Forecast(weather, format_date){
    return (
        <div>
        <div className='location-box'>
          <div className='date'>{format_date}</div>
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

export default Forecast;
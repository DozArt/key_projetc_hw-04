
  // форматирование даты
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getUTCDay()];
    let date = d.getUTCDate();
    let month = months[d.getUTCMonth()];
    let year = d.getUTCFullYear();
    let hour = d.getUTCHours()

    return `${day} ${date} ${month} ${year} ${hour}`
  }

function Forecast(weather, timezone){
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

export default Forecast;
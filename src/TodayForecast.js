
  // форматирование даты
  const format_date = (d, next_d = 0) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    d.setDate(d.getDate() + next_d);
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

function Forecast(weather){
    return (
    <div>
        <div className='location-box'>
            <a href ="#1" className='date'>{format_date(new Date(weather.dt * 1000))}</a>
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
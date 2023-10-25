 import React, { useState } from 'react';

// доступ к API сервиса погоды
const api = {
  key: 'c7616da4b68205c2f3ae73df2c31d177',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather, setWeather] = useState({});	// вся информация в массиве weather


  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${city}&units=metric&cnt=5&appid=${api.key}`) // отправляем запрос
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeather(result);
          setCity('');			  // очищаем переменную city
          console.log(result);
        });
    }
  }

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

  // JSX разметка
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyUp={search}	// следим за нажатием кнопки
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{format_date(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
        {(typeof weather.list !='undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.city.name}, {weather.city.country}</div>
            <div className='date'>{format_date(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.list[0].main.temp)}°c
            </div>
            <div className='weather'>{weather.list[0].weather[0].main}</div>
          </div>
          <div className='location-box'>
            <div className='location'>{weather.city.name}, {weather.city.country}</div>
            <div className='date'>{format_date(new Date(), 2)}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.list[1].main.temp)}°c
            </div>
            <div className='weather'>{weather.list[1].weather[0].main}</div>
          </div>
        </div>
        
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

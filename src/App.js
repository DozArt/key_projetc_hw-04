 import React, { useState } from 'react';
import Forecast from './Forecast';

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

  let weather2 = weather

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${city}&units=metric&cnt=40&appid=${api.key}`) // отправляем запрос
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeather(result);
          setCity('');			  // очищаем переменную city
          console.log(result);
        });
    }
  }

  
  const today = () => {
    weather2 = weather.list.slice(0,9);
    console.log(weather2);
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
        {(typeof weather.list !='undefined') ? (
          <div>
            <div className='location'>{weather.city.name}, {weather.city.country}</div>
            <button onClick={today}>Прогноз на 5 дней</button>
            {weather.list.map(arg => (
              <h3 key={arg.dt}>{Forecast(arg)}</h3>
            ))}
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
